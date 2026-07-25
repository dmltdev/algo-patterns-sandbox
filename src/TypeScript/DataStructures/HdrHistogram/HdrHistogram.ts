interface HdrHistogramOptions {
  /**
   * Smallest value for which distinct resolution is required.
   *
   * Example:
   *   1 for integer microseconds
   *   1_000 for nanoseconds with 1µs base resolution
   */
  lowestDiscernibleValue: number;

  /**
   * Largest value that may be recorded.
   */
  highestTrackableValue: number;

  /**
   * Decimal significant digits of precision, normally 1–5.
   */
  significantDigits: number;
}

export class HdrHistogram {
  private readonly lowestDiscernibleValue: number;
  private readonly highestTrackableValue: number;
  private readonly significantDigits: number;

  /**
   * Values below 2^unitMagnitude have the base resolution.
   */
  private readonly unitMagnitude: number;

  /**
   * Number of sub-buckets is a power of two.
   */
  private readonly subBucketCountMagnitude: number;
  private readonly subBucketHalfCountMagnitude: number;
  private readonly subBucketCount: number;
  private readonly subBucketHalfCount: number;

  /**
   * Used when finding the bucket containing a value.
   */
  private readonly subBucketMask: number;

  private readonly bucketCount: number;
  private readonly counts: Float64Array;

  private totalCount = 0;
  private minNonZeroValue = Number.POSITIVE_INFINITY;
  private maxValue = 0;

  public constructor(options: HdrHistogramOptions) {
    const { lowestDiscernibleValue, highestTrackableValue, significantDigits } =
      options;

    if (
      !Number.isSafeInteger(lowestDiscernibleValue) ||
      lowestDiscernibleValue < 1
    ) {
      throw new RangeError(
        "lowestDiscernibleValue must be a positive safe integer",
      );
    }

    if (
      !Number.isSafeInteger(highestTrackableValue) ||
      highestTrackableValue < lowestDiscernibleValue * 2
    ) {
      throw new RangeError(
        "highestTrackableValue must be at least twice lowestDiscernibleValue",
      );
    }

    if (
      !Number.isInteger(significantDigits) ||
      significantDigits < 1 ||
      significantDigits > 5
    ) {
      throw new RangeError("significantDigits must be between 1 and 5");
    }

    this.lowestDiscernibleValue = lowestDiscernibleValue;
    this.highestTrackableValue = highestTrackableValue;
    this.significantDigits = significantDigits;

    this.unitMagnitude = Math.floor(Math.log2(lowestDiscernibleValue));

    /*
     * To preserve N decimal significant digits, each power-of-two interval
     * needs at least 2 × 10^N subdivisions.
     *
     * The count is rounded up to a power of two so indexing can use shifts
     * in native implementations.
     */
    const largestValueWithSingleUnitResolution = 2 * 10 ** significantDigits;

    this.subBucketCountMagnitude = Math.ceil(
      Math.log2(largestValueWithSingleUnitResolution),
    );

    this.subBucketHalfCountMagnitude = this.subBucketCountMagnitude - 1;

    this.subBucketCount = 2 ** this.subBucketCountMagnitude;

    this.subBucketHalfCount = this.subBucketCount / 2;

    /*
     * Equivalent to:
     *
     * (subBucketCount - 1) << unitMagnitude
     *
     * Multiplication is used because JavaScript bitwise operators are
     * limited to signed 32-bit integers.
     */
    this.subBucketMask = (this.subBucketCount - 1) * 2 ** this.unitMagnitude;

    this.bucketCount = this.calculateBucketCount(highestTrackableValue);

    /*
     * Bucket zero stores all sub-buckets.
     * Every later bucket stores only its upper half because its lower half
     * overlaps the upper half of the preceding bucket.
     */
    const countsLength = (this.bucketCount + 1) * this.subBucketHalfCount;

    this.counts = new Float64Array(countsLength);
  }

  public recordValue(value: number): void {
    this.recordValueWithCount(value, 1);
  }

  public recordValueWithCount(value: number, count: number): void {
    this.assertRecordableValue(value);

    if (!Number.isSafeInteger(count) || count <= 0) {
      throw new RangeError("count must be a positive safe integer");
    }

    const index = this.countsArrayIndexFor(value);

    if (index < 0 || index >= this.counts.length) {
      throw new RangeError(
        `Value ${value} is outside the configured histogram range`,
      );
    }

    this.counts[index] += count;
    this.totalCount += count;

    if (value > this.maxValue) {
      this.maxValue = value;
    }

    if (value !== 0 && value < this.minNonZeroValue) {
      this.minNonZeroValue = value;
    }
  }

  public getTotalCount(): number {
    return this.totalCount;
  }

  public getValueAtPercentile(percentile: number): number {
    if (!Number.isFinite(percentile)) {
      throw new RangeError("percentile must be finite");
    }

    if (this.totalCount === 0) {
      return 0;
    }

    const normalizedPercentile = Math.min(100, Math.max(0, percentile));

    const requestedCount = Math.max(
      1,
      Math.ceil((normalizedPercentile / 100) * this.totalCount),
    );

    let cumulativeCount = 0;

    for (let index = 0; index < this.counts.length; index++) {
      cumulativeCount += this.counts[index];

      if (cumulativeCount >= requestedCount) {
        const lowestEquivalentValue = this.valueFromIndex(index);

        /*
         * Returning the upper edge of the equivalent range is consistent
         * with normal HdrHistogram percentile reporting.
         */
        return this.highestEquivalentValue(lowestEquivalentValue);
      }
    }

    return this.highestEquivalentValue(this.maxValue);
  }

  public getMinValue(): number {
    if (this.totalCount === 0) {
      return 0;
    }

    /*
     * A zero may have been recorded even when minNonZeroValue is finite.
     */
    if (this.counts[0] > 0) {
      return 0;
    }

    return this.lowestEquivalentValue(this.minNonZeroValue);
  }

  public getMaxValue(): number {
    if (this.totalCount === 0) {
      return 0;
    }

    return this.highestEquivalentValue(this.maxValue);
  }

  public getMean(): number {
    if (this.totalCount === 0) {
      return 0;
    }

    let weightedSum = 0;

    for (let index = 0; index < this.counts.length; index++) {
      const count = this.counts[index];

      if (count === 0) {
        continue;
      }

      const value = this.valueFromIndex(index);
      const representativeValue = this.medianEquivalentValue(value);

      weightedSum += representativeValue * count;
    }

    return weightedSum / this.totalCount;
  }

  public reset(): void {
    this.counts.fill(0);
    this.totalCount = 0;
    this.minNonZeroValue = Number.POSITIVE_INFINITY;
    this.maxValue = 0;
  }

  /**
   * Lowest value represented by the same counter as `value`.
   */
  public lowestEquivalentValue(value: number): number {
    const bucketIndex = this.getBucketIndex(value);
    const equivalentRange = this.getEquivalentRangeSize(bucketIndex);

    return Math.floor(value / equivalentRange) * equivalentRange;
  }

  /**
   * Highest value represented by the same counter as `value`.
   */
  public highestEquivalentValue(value: number): number {
    return this.nextNonEquivalentValue(value) - 1;
  }

  public medianEquivalentValue(value: number): number {
    const bucketIndex = this.getBucketIndex(value);
    const range = this.getEquivalentRangeSize(bucketIndex);

    return this.lowestEquivalentValue(value) + range / 2;
  }

  public nextNonEquivalentValue(value: number): number {
    const bucketIndex = this.getBucketIndex(value);

    return (
      this.lowestEquivalentValue(value) +
      this.getEquivalentRangeSize(bucketIndex)
    );
  }

  private calculateBucketCount(highestTrackableValue: number): number {
    let smallestUntrackableValue =
      this.subBucketCount * 2 ** this.unitMagnitude;

    let bucketsNeeded = 1;

    while (smallestUntrackableValue <= highestTrackableValue) {
      smallestUntrackableValue *= 2;
      bucketsNeeded++;
    }

    return bucketsNeeded;
  }

  /**
   * Maps a measured value to an exponentially sized bucket.
   */
  private getBucketIndex(value: number): number {
    /*
     * Native implementations commonly use count-leading-zeros here.
     *
     * OR-ing with subBucketMask ensures small values remain in bucket zero.
     * Because JavaScript bitwise OR is only 32-bit, we compute the equivalent
     * magnitude using max().
     */
    const adjustedValue = Math.max(value, this.subBucketMask);

    const valueMagnitude =
      adjustedValue === 0 ? 0 : Math.floor(Math.log2(adjustedValue));

    return Math.max(
      0,
      valueMagnitude - this.unitMagnitude - this.subBucketCountMagnitude,
    );
  }

  /**
   * Finds the linear sub-bucket within an exponential bucket.
   */
  private getSubBucketIndex(value: number, bucketIndex: number): number {
    const bucketUnitMagnitude = bucketIndex + this.unitMagnitude;

    return Math.floor(value / 2 ** bucketUnitMagnitude);
  }

  private countsArrayIndexFor(value: number): number {
    const bucketIndex = this.getBucketIndex(value);

    const subBucketIndex = this.getSubBucketIndex(value, bucketIndex);

    return this.countsArrayIndex(bucketIndex, subBucketIndex);
  }

  private countsArrayIndex(
    bucketIndex: number,
    subBucketIndex: number,
  ): number {
    /*
     * Bucket 0:
     *
     *   index = subBucketIndex
     *
     * Bucket 1 and above:
     *
     *   only the upper half is stored because the lower half overlaps with
     *   the previous bucket.
     */
    const bucketBaseIndex = (bucketIndex + 1) * this.subBucketHalfCount;

    const offsetInBucket = subBucketIndex - this.subBucketHalfCount;

    return bucketBaseIndex + offsetInBucket;
  }

  private valueFromIndex(index: number): number {
    let bucketIndex = Math.floor(index / this.subBucketHalfCount) - 1;

    let subBucketIndex =
      (index % this.subBucketHalfCount) + this.subBucketHalfCount;

    /*
     * The first half-count indices belong to the lower half of bucket zero.
     */
    if (bucketIndex < 0) {
      subBucketIndex -= this.subBucketHalfCount;
      bucketIndex = 0;
    }

    return subBucketIndex * 2 ** (bucketIndex + this.unitMagnitude);
  }

  private getEquivalentRangeSize(bucketIndex: number): number {
    return 2 ** (this.unitMagnitude + bucketIndex);
  }

  private assertRecordableValue(value: number): void {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new RangeError("value must be a non-negative safe integer");
    }

    if (value > this.highestTrackableValue) {
      throw new RangeError(
        `Value ${value} exceeds highestTrackableValue ` +
          `${this.highestTrackableValue}`,
      );
    }
  }
}

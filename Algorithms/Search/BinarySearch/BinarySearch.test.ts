import { binarySearch } from "./BinarySearch";
import { describe, it, expect } from "vitest";

const arr = Array.from(Array(100 + 1).keys()).slice(1);

describe("Binary Search", () => {
  it("Element is found", () => {
    expect(binarySearch(arr, 1)).toBe(0);
    expect(binarySearch(arr, 50)).toBe(49);
    expect(binarySearch(arr, 100)).toBe(99);
  });

  it("Element is not found", () => {
    expect(binarySearch(arr, 0)).toBe(-1);
    expect(binarySearch(arr, 101)).toBe(-1);
  });

  it("Empty Array", () => {
    expect(binarySearch([], 10)).toBe(-1);
  });

  it("Negative Values", () => {
    expect(binarySearch([-100, -50, -1], -100)).toBe(0);
    expect(binarySearch([-100, -50, -1], -50)).toBe(1);
    expect(binarySearch([-100, -50, -1], -1)).toBe(2);
  });

  it("Smallest array, element not found", () => {
    expect(binarySearch([1], 0)).toBe(-1);
  });

  it("Largest array, element found", () => {
    expect(binarySearch(arr, 50)).toBe(49);
  });

  it("Element smaller than smallest element in array", () => {
    expect(binarySearch(arr, 0)).toBe(-1);
  });

  it("Element larger than largest element in array", () => {
    expect(binarySearch(arr, 101)).toBe(-1);
  });

  it("Array with all identical elements, element found", () => {
    const identicalArray = [1, 1, 1, 1, 1];
    expect(binarySearch(identicalArray, 1)).toBe(2);
  });

  it("Array with repeated elements, element not found", () => {
    const repeatedArray = [1, 1, 2, 2, 3, 3];
    expect(binarySearch(repeatedArray, 4)).toBe(-1);
  });

  it("Array with negative values, element found", () => {
    const negativeArray = [-100, -50, -1, 0, 50, 100];
    expect(binarySearch(negativeArray, -100)).toBe(0);
    expect(binarySearch(negativeArray, 50)).toBe(4);
  });

  it("Even-length array, element in the middle", () => {
    const evenArray = [1, 2, 3, 4];
    expect(binarySearch(evenArray, 3)).toBe(2);
  });

  it("Odd-length array, element in the middle", () => {
    const oddArray = [1, 2, 3, 4, 5];
    expect(binarySearch(oddArray, 3)).toBe(2);
  });

  it("Non-integer values, element found", () => {
    const floatArray = [0.1, 0.2, 0.3, 0.4, 0.5];
    expect(binarySearch(floatArray, 0.3)).toBe(2);
  });

  it("Element not found, key greater than all elements", () => {
    const sortedArray = [1, 2, 3, 4, 5];
    expect(binarySearch(sortedArray, 6)).toBe(-1);
  });
});

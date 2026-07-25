class XorShift32 {
  private state: number;

  constructor(seed?: number) {
    this.state = seed || Date.now();
  }

  next() {
    let x = this.state;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    this.state = x;
    return (x >>> 0) / 0xffffffff;
  }
}

// Example
const rng = new XorShift32();

console.log(rng.next()); // Random number between 0 and 1
console.log(rng.next());
console.log(rng.next());

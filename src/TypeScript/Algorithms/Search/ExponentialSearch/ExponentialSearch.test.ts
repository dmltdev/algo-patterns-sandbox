import { exponentialSearch } from "./ExponentialSearch";
import { describe, it, expect } from "vitest";

const arr = Array.from(Array(100 + 1).keys()).slice(1);

describe("Exponential Search", () => {
  it("Element found", () => {
    expect(exponentialSearch(arr, 1)).toBe(0);
    expect(exponentialSearch(arr, 50)).toBe(49);
    expect(exponentialSearch(arr, 100)).toBe(99);
  });

  it("Element not found", () => {
    expect(exponentialSearch(arr, -100)).toBe(-1);
    expect(exponentialSearch(arr, -50)).toBe(-1);
    expect(exponentialSearch(arr, -1)).toBe(-1);
  });

  it("Empty Array", () => {
    expect(exponentialSearch([], 10)).toBe(-1);
  });

  it("Negative Values", () => {
    expect(exponentialSearch([-100, -50, -1], -100)).toBe(0);
    expect(exponentialSearch([-100, -50, -1], -50)).toBe(1);
    expect(exponentialSearch([-100, -50, -1], -1)).toBe(2);
  });
});

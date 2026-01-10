import { linearSearch } from "./LinearSearch";
import { describe, it, expect } from "vitest";

const arr = Array.from(Array(100 + 1).keys()).slice(1);

function expectLinearSearchResults(arr: number[], cases: [number, number][]) {
  cases.forEach(([searchValue, expectedIndex]) => {
    expect(linearSearch(arr, searchValue)).toBe(expectedIndex);
  });
}

describe("Linear Search", () => {
  it("Element found", () => {
    expectLinearSearchResults(arr, [
      [1, 0],
      [50, 49],
      [100, 99],
    ]);
  });

  it("Element not found", () => {
    expectLinearSearchResults(arr, [
      [-100, -1],
      [-50, -1],
      [-1, -1],
    ]);
  });

  it("Empty Array", () => {
    expectLinearSearchResults([], [[10, -1]]);
  });

  it("Negative Values", () => {
    expectLinearSearchResults([-100, -50, -1], [[-100, 0]]);
    expectLinearSearchResults([-100, -50, -1], [[-50, 1]]);
    expectLinearSearchResults([-100, -50, -1], [[-1, 2]]);
  });
});

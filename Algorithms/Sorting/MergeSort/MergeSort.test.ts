import { mergeSort } from "./MergeSort";
import { expect, describe, it } from "vitest";

function shuffleIntegerArray(arr: number[]): void {
  const n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    arr[i] = Math.floor(Math.random() * 100) + arr[i];
  }
}

function shuffleFloatingArray(arr: number[]): void {
  const n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    arr[i] = Math.random() * 100 + arr[i];
  }
}

describe("Selection Sort", () => {
  it("Array of integers is sorted", () => {
    const array = Array.from(Array(100 + 1).keys()).slice(1);
    shuffleIntegerArray(array);
    let sortedArr = array.slice().sort((a, b) => a - b);
    expect(mergeSort(array)).toStrictEqual(sortedArr);
  });

  it("Array of floating numbers is sorted", () => {
    const array = Array.from(Array(100 + 1).keys()).slice(1);
    shuffleFloatingArray(array);
    let sortedArr = array.slice().sort((a, b) => a - b);
    expect(mergeSort(array)).toStrictEqual(sortedArr);
  });

  it("Empty Array", () => {
    expect(mergeSort([])).toStrictEqual([]);
  });
});

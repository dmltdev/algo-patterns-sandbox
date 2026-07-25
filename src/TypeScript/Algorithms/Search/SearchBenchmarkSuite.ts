import Benchmark from "benchmark";

import { linearSearch } from "./LinearSearch/LinearSearch";
import { sentinelLinearSearch } from "./SentinelLinearSearch/SentinelLinearSearch";
import { binarySearch } from "./BinarySearch/BinarySearch";
import { metaBinarySearch } from "./MetaBinarySearch/MetaBinarySearch";
import { exponentialSearch } from "./ExponentialSearch/ExponentialSearch";

const suite = new Benchmark.Suite();

function shuffleArray(arr: number[]): void {
  const n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + Math.random() * 10));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const array: number[] = Array.from(Array(10000 + 1).keys()).slice(1);
shuffleArray(array);

const target = array[array.length - 100];

suite
  .add("Linear Search", function () {
    linearSearch(array, target);
  })
  .add("Sentinel Linear Search", () => {
    sentinelLinearSearch(array, target);
  })
  .add("Binary Search", () => {
    binarySearch(array, target);
  })
  .add("Meta Binary Search", () => {
    metaBinarySearch(array, target);
  })
  .add("Exponential Search", () => {
    exponentialSearch(array, target);
  })
  .on("cycle", function (event: any) {
    console.log(String(event.target));
  })
  .run({ async: true });

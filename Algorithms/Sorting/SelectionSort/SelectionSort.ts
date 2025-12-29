/* 
Selection Sort

Time complexity:
— worst: O(n^2) | If we want to sort in ascending order and the array is in descending order then, the worst case occurs.
— average: O(n^2) | It occurs when the elements of the array are in jumbled order (neither ascending nor descending).
— best: O(n^2) | It occurs when the array is already sorted

Space complexity is O(1) because an extra variable lowest is used.


The selection sort is used when
— a small list is to be sorted
— cost of swapping does not matter
— checking of all the elements is compulsory
— cost of writing to a memory matters like in flash memory (number of writes/swaps is O(n) as compared to O(n2) of bubble sort)
*/

export default function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
      // or swap with destructuring
      // [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}
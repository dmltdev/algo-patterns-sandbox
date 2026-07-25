/* 

Bubble Sort 

*Pseudocode:
bubbleSort(array)
  for i <- 1 to indexOfLastUnsortedElement-1
    if leftElement > rightElement
      swap leftElement and rightElement
end bubbleSort

*Time complexity: O(N^2)
— best: O(n); | If the array is already sorted, then there is no need for sorting.
— worst: O(n^2); | If we want to sort in ascending order and the array is in descending order then the worst case occurs.
— average: O(n^2); | It occurs when the elements of the array are in jumbled order (neither ascending nor descending).

*Space complexity is O(1) because an extra variable is used for swapping.

*Bubble sort is used if
— complexity does not matter
— short and simple code is preferred

In the optimized bubble sort algorithm, two extra variables may be used: 
- flag "swapped" (becomes true if elements are swapped) and 
- var "temp" (to hold the temp value of arr[i]). 
Hence, the space complexity will be O(2).

But we can use a destructuring assignment to get rid of the extra variable "temp".

*/

export default function bubbleSort(arr: number[]): number[] {
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        // or swap with destructuring
        // [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  }

  return arr;
}

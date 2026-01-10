/* 
Insertion Sort 

*Pseudocode
insertionSort(array)
  mark first element as sorted
  for each unsorted element X
    'extract' the element X
    for j <- lastSortedIndex down to 0
      if current element j > X
        move sorted element to the right by 1
    break loop and insert X here
end insertionSort

*Time Complexity
- worst case: O(n^2) | Suppose, an array is in ascending order, and you want to sort it in descending order. In this case, worst case complexity occurs.
- average case: O(n^2) | It occurs when the elements of an array are in jumbled order (neither ascending nor descending).
- best case: O(n) | When the array is already sorted, the outer loop runs for n number of times whereas the inner loop does not run at all. So, there are only n number of comparisons. Thus, complexity is linear.

*Space Complexity is O(1) because an extra variable key is used.

*Insertion Sort is used when
- the array has a small number of elements;
- there are only a few elements left to be sorted;

*/

export function insertionSort(arr: number[]): number[] {
  for (let step = 1; step < arr.length; step++) {
    const key = arr[step];
    let j = step - 1;

    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    arr[j + 1] = key;
  }

  return arr;
}

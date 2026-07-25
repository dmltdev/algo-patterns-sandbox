/* 
Use the exponential search only when the sequence is unbounded or when you know the value is likely to be among the first ones.
Otherwise, use a binary search.
*/
export function exponentialSearch(arr: number[], key: number): number {
  if (arr[0] === key) {
    return 0;
  }

  let i = 1;
  while (i < arr.length && arr[i] <= key) {
    i *= 2;
  }

  return binarySearch(arr, i / 2, Math.min(i, arr.length - 1), key);
}

function binarySearch(
  arr: number[],
  left: number,
  right: number,
  key: number
): number {
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === key) return mid;
    if (arr[mid] < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

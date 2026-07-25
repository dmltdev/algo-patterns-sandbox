export function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): T[] {
  if (left >= right) return arr;

  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);

  return arr;
}

function partition<T>(arr: T[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

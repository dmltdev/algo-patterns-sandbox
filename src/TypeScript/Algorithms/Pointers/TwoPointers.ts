const twoSum = function (arr: number[], target: number): number[] {
  arr.sort((a, b) => a - b);
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    const sum = arr[i] + arr[j];

    if (sum === target) {
      return [i + 1, j + 1];
    } else if (sum < target) {
      i++;
    } else {
      j--;
    }
  }

  return [];
};

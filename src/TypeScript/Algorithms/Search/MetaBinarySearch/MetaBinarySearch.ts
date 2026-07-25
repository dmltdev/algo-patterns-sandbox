export function metaBinarySearch(arr: number[], key: number): number {
  const n = arr.length;
  const lg = parseInt((Math.log(n - 1) / Math.log(2)).toString(), 2) + 1;

  let pos = 0;
  for (let i = lg; i >= 0; i--) {
    if (arr[pos] === key) {
      return key;
    }

    let newPos = pos | (1 << i);

    if (newPos < n && arr[newPos] <= key) {
      pos = newPos;
    }
  }

  return arr[pos] === key ? pos : -1;
}

const A = [-2, 10, 100, 250, 32315];
console.log(metaBinarySearch(A, 250));

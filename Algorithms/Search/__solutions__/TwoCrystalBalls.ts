// The Big O of this algorithm is O(sqrt(n))
export function twoCrystallBalls(breaks: boolean[]): number {
  const jumpLength: number = Math.floor(Math.sqrt(breaks.length));

  let i = jumpLength;
  for (i; i < breaks.length; i += jumpLength) {
    if (breaks[i]) {
      break;
    }
  }

  i -= jumpLength;

  for (let j = i; j < breaks.length; j++) {
    if (breaks[j]) {
      return j;
    }
  }

  return -1;
}

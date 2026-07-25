/* 
Boyer Moore majority vote algorithm

The Boyer-Moore voting method is one of the most often used optimum algorithms 
for determining the majority element among elements with more than N/2 occurrences.

Time complexity: O(n);
Space complexity: O(1);
*/

export function boyerMooreVoting(nums: number[]): number {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }

    //! For debugging
    // console.log(`Candidate: ${candidate}, Count: ${count}`);
  }

  return candidate;
}
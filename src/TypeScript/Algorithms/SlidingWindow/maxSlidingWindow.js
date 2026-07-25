const maxSlidingWindow = function (nums, k) {
  if (nums.length === 1) return nums;

  let maxSum = 0;
  let maxWindow = [];
  let window = [];
  let sum = 0;
  const reducer = (arr) => arr.reduce((a, i) => a + i, 0);

  for (let i = 0; i < k; i++) {
    window.push(nums[i]);
  }
  sum = reducer(window);
  maxSum = sum;
  maxWindow = window.slice();

  for (let i = k; i < nums.length; i++) {
    window.shift();
    window.push(nums[i]);
    sum = reducer(window);

    if (sum > maxSum) {
      maxSum = sum;
      maxWindow = window.slice();
    }
  }

  return maxWindow;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

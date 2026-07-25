# Divide and Conquer

## Pattern

1. **Divide** - Break problem into smaller subproblems
2. **Conquer** - Solve subproblems recursively (base case when small enough)
3. **Combine** - Merge results from subproblems

## Key Characteristics

- Recursive approach
- No memoization (unlike DP)
- Each subproblem solved independently
- Time complexity often O(n log n)

## Common Problems

- **Binary Search** - O(log n)
- **Merge Sort** - O(n log n)
- **Quick Sort** - O(n log n) average, O(n²) worst
- **Maximum Subarray** - O(n log n)
- **Closest Pair of Points** - O(n log n)

## Template

```typescript
function divideConquer(problem) {
  // Base case
  if (problem.size <= threshold) {
    return solveDirect(problem);
  }

  // Divide
  const subproblems = divide(problem);

  // Conquer
  const results = subproblems.map((sub) => divideConquer(sub));

  // Combine
  return combine(results);
}
```

## vs Dynamic Programming

- **D&C**: No overlapping subproblems, no memoization
- **DP**: Overlapping subproblems, uses memoization

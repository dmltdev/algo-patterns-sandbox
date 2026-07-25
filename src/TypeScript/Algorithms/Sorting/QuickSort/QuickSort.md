# Quick Sort

## What It Is

A divide-and-conquer sorting algorithm that picks a pivot element, partitions the array around it (smaller elements left, larger right), then recursively sorts the partitions.

## Time Complexity

- **Average case**: O(n log n)
- **Worst case**: O(n²) — when pivot is always smallest/largest element
- **Best case**: O(n log n) — when pivot divides array roughly in half

## Space Complexity

- **O(log n)** for recursion stack (average case)
- **O(n)** worst case if unbalanced partitions create deep recursion

## When to Use

**Use Quick Sort when:**
- You need average-case O(n log n) performance
- You want in-place sorting
- You can tolerate O(n²) worst case
- Data is randomly distributed

**Don't use Quick Sort when:**
- You need guaranteed O(n log n) — use Merge Sort instead
- Input is nearly sorted — worst case likely
- Stability matters — Quick Sort is unstable (equal elements may swap order)
- Memory is extremely limited and you need true in-place — use Heap Sort

## How It Works

1. **Choose pivot**: Select an element (middle, first, last, or random)
2. **Partition**: Split array into elements < pivot and elements ≥ pivot
3. **Recursion**: Apply same process to left and right subarrays
4. **Base case**: Arrays of length 0 or 1 are already sorted

## Why It Works

**Correctness:**
- After partitioning, pivot is in its final position
- All elements left of pivot are smaller
- All elements right of pivot are larger
- Recursively sorting left and right guarantees global sort

**Performance:**
- Each level processes n elements (partitioning)
- With balanced pivots, tree depth is log n
- Total: O(n log n)

## In-Place Implementation
```typescript
function quickSort(arr: T[], left = 0, right = arr.length - 1): T[] {
  if (left >= right) return arr;
  
  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
  
  return arr;
}

function partition(arr: T[], left: number, right: number): number {
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
```

## Key Differences from Merge Sort

| Aspect | Quick Sort | Merge Sort |
|--------|-----------|------------|
| Worst case | O(n²) | O(n log n) |
| Space | O(log n) avg | O(n) |
| Stability | Unstable | Stable |
| In-place | Yes | No |
| Cache locality | Better | Worse |

## Practical Considerations

**Pivot selection strategies:**
- **Random pivot**: Avoids worst case on sorted input
- **Median-of-three**: Pick median of first, middle, last
- **Middle element**: Okay for random data

**Optimizations:**
- Switch to Insertion Sort for small subarrays (< 10 elements)
- Three-way partitioning for arrays with many duplicates
- Tail recursion elimination to reduce stack depth

## When You'll See It

- JavaScript's `Array.sort()` uses Quick Sort variant (V8 engine)
- Interview problems asking for sorting in O(n log n) average
- Kth largest/smallest element (Quick Select variant)
- Partitioning problems (Dutch National Flag, etc.)

## Common Mistakes

1. Missing base case check
2. Creating new arrays instead of in-place swapping
3. Not handling duplicates correctly
4. Infinite recursion from poor pivot choice
5. Off-by-one errors in partition logic
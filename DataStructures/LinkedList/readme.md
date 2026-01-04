# Linked List

Linked list is a linear data structure that includes nodes that point to each other.
The first node in the linked list is head, and the last is tail.
Each node points to the next node except for the tail node.

Linked list can be of multiple types:
- singly: each node points to the next node in the list
- doubly: each node points to the previous and next nodes in the list
- circular: same as doubly, but also the first element points to the last elements and the last element points to the first element

## Complexity

Time Complexity

|              | Worst Case   | Average Case |
| -----------  | -----------  | -----------  |
| Search       | O(n)         | O(n)         |
| Insert       | O(1)         | O(1)         |
| Deletion     | O(1)         | O(1)         |

Space Complexity: O(n)

## Useful applications

- Dynamic memory allocation
- Implemented in stack and queue
- In undo functionality of softwares
- Hash tables, Graphs

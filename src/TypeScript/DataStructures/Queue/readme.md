# Data Structure: Queue

A queue is similar to the ticket queue inside a cinema hall, where the first person entering the queue is the first person who gets the ticket.

Queue follows the "First In, First Out" (FIFO) rule - the item that goes in first is the item that comes out first.

Putting items in the queue is called enqueue, And removing items from the queue is called dequeue.

## Basic Operations of Queue

- Enqueue, O(1): Add an element to the end of the queue
- Dequeue, O(1): Remove an element from the front of the queue
- IsEmpty, O(1):  Check if the queue is empty
- IsFull, O(1): Check if the queue is full
- Peek, O(1): Get the value of the front of the queue without removing it;

## When to use queue

- CPU scheduling, Disk Scheduling
- When data is transferred asynchronously between two processes.The queue is used for synchronization. For example: IO Buffers, pipes, file IO, etc
- Handling of interrupts in real-time systems.
- Call Center phone systems use Queues to hold people calling them in order.

## Types of Queue

- Simple Queue: the item that goes in first is the item that comes out first.
- Deque: ...
- Priority Queue: ...
- Circular Queue: ...

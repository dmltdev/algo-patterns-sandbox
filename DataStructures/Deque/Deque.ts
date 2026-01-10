/* 

Deque or Double Ended Queue is a type of queue in which 
insertion and removal of elements can either be performed 
from the front or the rear. Thus, it does not follow 
FIFO rule (First In First Out).

Input Restricted Deque - input is restricted at a single end but allows deletion at both the ends.
Output Restricted Deque - output is restricted at a single end but allows insertion at both the ends.
*/

export class DequeNode<T> {
  value: T;
  next: DequeNode<T> | null;
  prev: DequeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class Deque<T> {
  private head: DequeNode<T> | null;
  private tail: DequeNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  addFront(value: T): void {
    const newNode = new DequeNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head!.prev = newNode;
      this.head = newNode;
    }

    this.size++;
  }

  addRear(value: T): void {
    const newNode = new DequeNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  removeFront(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const removedValue = this.head!.value;
    this.head = this.head!.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this.size--;
    return removedValue;
  }

  removeRear(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const removedValue = this.tail!.value;
    this.tail = this.tail!.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    this.size--;
    return removedValue;
  }

  peekFront(): T | null {
    return this.isEmpty() ? null : this.head!.value;
  }

  peekRear(): T | null {
    return this.isEmpty() ? null : this.tail!.value;
  }

  getSize(): number {
    return this.size;
  }
}

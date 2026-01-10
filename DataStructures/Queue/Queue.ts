class Node<T = unknown> {
  public value: T;
  public next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}

export class Queue<T = unknown> {
  public length: number;
  private head: Node<T> | undefined;
  private tail: Node<T> | undefined;
  private capacity: number;

  constructor(capacity: number = 5) {
    this.head = this.tail = undefined;
    this.length = 0;
    this.capacity = capacity;
  }

  enqueue(item: T): void | null {
    if (this.isFull()) return null;

    const node = new Node(item);

    if (!this.tail) {
      this.tail = this.head = node;
    }

    this.tail.next = node;
    this.tail = node;

    this.length++;
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;

    const head = this.head;
    this.head = this.head.next;

    head.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }

  peek(): T | undefined {
    if (this.head) return this.head.value;
    return undefined;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  isFull(): boolean {
    return this.length === this.capacity;
  }
}

/*
 */
class Node<T> {
  public value: T;
  public prev: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
    this.prev = undefined;
  }
}

export class Stack<T> {
  public length: number;
  private head: Node<T> | undefined;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const node = new Node(item);
    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    const poppedValue = this.head.value;
    this.head = this.head.prev;
    this.length--;

    return poppedValue;
  }

  peek(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    return this.head.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}

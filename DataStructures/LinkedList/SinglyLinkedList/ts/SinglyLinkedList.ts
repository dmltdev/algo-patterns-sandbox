export class Node<T> {
  public data: T;
  public next: Node<T> | null;
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  public head: Node<T> | null;
  public next: Node<T> | null;

  constructor() {
    this.head = null;
    this.next = null;
  }

  insert(data: T) {
    let newNode: Node<T> = new Node(data);

    newNode.next = this.head;
    this.head = newNode;
  }

  get length(): number {
    let count = 0;
    let node: Node<T> | null = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  clear(): void {
    this.head = null;
  }

  getTail(): Node<T> | null {
    if (!this.head) return null;
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  getHead(): Node<T> | null {
    return this.head;
  }

  reverse(): void {
    if (!this.head) return;

    let currentNode: Node<T> | null = this.head;
    let prevNode: Node<T> | null = null;
    let nextNode: Node<T> | null = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode!.next = prevNode;
      [prevNode, currentNode] = [currentNode, nextNode];
    }

    this.head = prevNode;
  }
}

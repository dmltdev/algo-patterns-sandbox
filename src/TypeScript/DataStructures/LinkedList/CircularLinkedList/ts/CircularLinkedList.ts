function assertNode<T>(node: null | Node<T>): node is Node<T> {
  return node !== null;
}

export class Node<T> {
  public value: T;
  public next: Node<T> | null;
  public prev: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class CircularLinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insertAtHead(item: T): Node<T> {
    const node = new Node(item);
    if (this.length === 0) {
      this.head = this.tail = node;
      node.next = node.prev = node;
    } else {
      node.next = this.head;
      node.prev = this.tail;
      if (assertNode(this.tail)) this.tail.next = node;
      if (assertNode(this.head)) this.head.prev = node;
      this.head = node;
    }

    this.length++;
    return node;
  }

  insertAtTail(item: T): Node<T> {
    const node = new Node(item);

    if (this.length === 0) {
      this.head = this.tail = node;
      node.next = node.prev = node;
    } else {
      node.prev = this.tail;
      node.next = this.head;
      if (assertNode(this.tail)) this.tail.next = node;
      if (assertNode(this.head)) this.head.prev = node;
      this.tail = node;
    }

    this.length++;
    return node;
  }

  removeAtHead(): Node<T> | null {
    if (!assertNode(this.head)) {
      return null;
    }

    const removedNode = this.head;
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      if (assertNode(this.head)) this.head.prev = this.tail;
      if (assertNode(this.tail)) this.tail.next = this.head;
    }

    removedNode.next = removedNode.prev = null;
    this.length--;
    return removedNode;
  }

  removeAtTail(): Node<T> | null {
    if (!assertNode(this.tail)) {
      return null;
    }

    const removedNode = this.tail;
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      if (assertNode(this.tail)) this.tail.next = this.head;
      if (assertNode(this.head)) this.head.prev = this.tail;
    }

    removedNode.next = removedNode.prev = null;
    this.length--;
    return removedNode;
  }

  getHead(): null | Node<T> {
    return this.head;
  }

  getTail(): null | Node<T> {
    return this.tail;
  }

  getLength(): number {
    return this.length;
  }

  isCircular(): boolean {
    let slowPtr = this.head;
    let fastPtr = this.head;

    while (assertNode(fastPtr) && assertNode(fastPtr.next)) {
      slowPtr = slowPtr!.next;
      fastPtr = fastPtr.next!.next;

      if (slowPtr === fastPtr) {
        return true;
      }
    }

    return false;
  }
}

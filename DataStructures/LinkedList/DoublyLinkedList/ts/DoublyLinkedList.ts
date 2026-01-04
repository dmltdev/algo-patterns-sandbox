export interface ListNode<T> {
  value: T;
  prev: null | ListNode<T>;
  next: null | ListNode<T>;
}

function assertNode<T>(node: null | ListNode<T>): node is ListNode<T> {
  return node !== null;
}

export default class LinkedList<T> {
  private head: null | ListNode<T>;
  private tail: null | ListNode<T>;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insertAtHead(this: LinkedList<T>, value: T): ListNode<T> {
    const newHeadNode: ListNode<T> = { value, prev: null, next: null };
    switch (this.length) {
      case 0:
        this.head = newHeadNode;
        this.tail = newHeadNode;
        break;
      default:
        if (assertNode(this.head)) {
          newHeadNode.next = this.head;
          this.head.prev = newHeadNode;
          this.head = newHeadNode;
        }
        break;
    }
    ++this.length;
    return newHeadNode;
  }

  insertAtTail(value: T): ListNode<T> {
    const newTailNode: ListNode<T> = { value, prev: null, next: null };
    switch (this.length) {
      case 0:
        this.head = newTailNode;
        this.tail = newTailNode;
        break;
      default:
        if (assertNode(this.tail)) {
          newTailNode.prev = this.tail;
          this.tail.next = newTailNode;
          this.tail = newTailNode;
        }
        break;
    }
    ++this.length;
    return newTailNode;
  }

  pop(): ListNode<T> | null {
    if (assertNode(this.tail)) {
      const poppedNode = this.tail;
      --this.length;
      switch (this.length) {
        case 0:
          this.head = null;
          this.tail = null;
          break;
        default:
          this.tail = poppedNode.prev;
          if (assertNode(this.tail)) {
            this.tail.next = null;
          }
          poppedNode.prev = null;
          poppedNode.next = null;
          break;
      }
      return poppedNode;
    } else return null;
  }

  shift(): ListNode<T> | null {
    if (assertNode(this.head)) {
      const poppedNode = this.head;
      --this.length;
      switch (this.length) {
        case 0:
          this.head = null;
          this.tail = null;
          break;
        default:
          this.head = poppedNode.next;
          if (assertNode(this.head)) {
            this.head.prev = null;
          }
          poppedNode.prev = null;
          poppedNode.next = null;
          break;
      }
      return poppedNode;
    } else return null;
  }

  getHead(): null | ListNode<T> {
    return this.head;
  }

  getTail(): null | ListNode<T> {
    return this.tail;
  }

  getLength(): number {
    return this.length;
  }

  reverse(): LinkedList<T> {
    switch (this.length) {
      case 0:
      case 1:
        return this;
      default:
        let iter = this.head;
        while (assertNode(iter)) {
          [iter.next, iter.prev] = [iter.prev, iter.next];
          iter = iter.prev;
        }
        [this.head, this.tail] = [this.tail, this.head];
        break;
    }

    return this;
  }
}

export function listFromValues<T>(...values: T[]): LinkedList<T> {
  const ll: LinkedList<T> = new LinkedList();
  for (let i = 0; i < values.length; i++) {
    ll.insertAtTail(values[i]);
  }
  return ll;
}

export function printLinkedList<T>(list: LinkedList<T>) {
  let node = list.getHead();
  while (assertNode(node)) {
    console.log(node.value);
    node = node.next;
  }
}

export function printLinkedListInReverse<T>(list: LinkedList<T>) {
  let node = list.getTail();
  while (assertNode(node)) {
    console.log(node.value);
    node = node.prev;
  }
}

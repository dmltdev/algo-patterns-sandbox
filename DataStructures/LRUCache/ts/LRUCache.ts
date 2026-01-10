/* 
LRU cache uses a doubly linked list in combination with a hash map.
The hash map provides O(1) access to nodes, and the linked list maintains the order of nodes from least recently used (LRU) to most recently used (MRU).

!The linked list is initialized with sentinel nodes that are not stored in the hash map: they are fixed and only the next and prev pointers of these nodes and other nodes in the list are updated. 
!Sentinel nodes are dummy nodes that simplify the code by eliminating the need for checking special cases (like inserting or removing at the beginning or end of the list), but they do not affect the inherent time complexity of these operations.

When a value is looked up, it becomes the most recently used (MRU), hence its position is changed to the right. 
The least recently used node (LRU) is located at the left. 
When a new node is put to the cache, exceeding its capacity, the LRU node is evicted.
*/

export type KeyType = string | number | boolean;
export type ValueType = any;

export class Node<K extends KeyType, V extends ValueType> {
  public key: K;
  public val: V;
  public next: Node<K, V> | null;
  public prev: Node<K, V> | null;

  constructor(key: K, val: V) {
    this.key = key;
    this.val = val;
    this.next = this.prev = null;
  }
}

export class LRUCache<K extends KeyType, V extends ValueType> {
  private cap: number;
  private cache: Map<K, Node<K, V>>;
  private left: Node<K, V>;
  private right: Node<K, V>;

  constructor(capacity: number) {
    this.cap = capacity;
    this.cache = new Map<K, Node<K, V>>();
    this.left = new Node<K, V>(null as unknown as K, null as unknown as V);
    this.right = new Node<K, V>(null as unknown as K, null as unknown as V);
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  clear(): void {
    this.cache = new Map<K, Node<K, V>>();
    this.left = new Node<K, V>(null as unknown as K, null as unknown as V);
    this.right = new Node<K, V>(null as unknown as K, null as unknown as V);
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  remove(node: Node<K, V>): void {
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
  }

  insert(node: Node<K, V>): void {
    const prev = this.right.prev!;
    const next = this.right;
    prev.next = next.prev = node;
    node.next = next;
    node.prev = prev;
  }

  get(key: K): V | null {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      this.remove(node);
      this.insert(node);
      return node.val;
    }
    return null;
  }

  peekNewest(): V | null {
    return this.right.prev!.val;
  }

  peekOldest(): V | null {
    return this.left.next!.val;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!);
    }
    const newNode = new Node(key, value);
    this.cache.set(key, newNode);
    this.insert(newNode);

    if (this.cache.size > this.cap) {
      const lru = this.left.next!;
      this.remove(lru);
      this.cache.delete(lru.key);
    }
  }
}

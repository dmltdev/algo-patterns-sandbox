/* 
A simple hash map implementation.

Methods:
- hash
- set
- get
- isEmpty
- clear
*/

export class HashMap {
  private _storage: { [key: number]: [string, number][] };

  constructor() {
    this._storage = {};
  }

  // O(n)
  hashStr(str: string): number {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      finalHash += charCode;
    }
    return finalHash;
  }

  // average: O(1), worst: O(n)
  set(key: string, val: number): void {
    const hash = this.hashStr(key);

    if (!this._storage[hash]) {
      this._storage[hash] = [];
    }

    for (let i = 0; i < this._storage[hash].length; i++) {
      if (this._storage[hash][i][0] === key) {
        this._storage[hash][i][1] = val;
        return;
      }
    }

    this._storage[hash].push([key, val]);
  }

  // average: O(1), worst: O(k), where k is the number of key-value pairs in the same bucket.
  get(key: string): number | undefined {
    const hash = this.hashStr(key);

    if (!this._storage[hash]) {
      return undefined;
    }

    for (const [storedKey, storedValue] of this._storage[hash]) {
      if (storedKey === key) {
        return storedValue;
      }
    }

    return undefined;
  }

  clear(): void {
    this._storage = {};
  }

  size(): number {
    let size = 0;
    for (const key in this._storage) {
      size += this._storage[parseInt(key)].length;
    }
    return size;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}

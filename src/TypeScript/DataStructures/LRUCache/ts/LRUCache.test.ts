import { LRUCache } from "./LRUCache.ts";
import { describe, test, beforeEach, expect } from "vitest";

describe("LRUCache", () => {
  let cache;

  beforeEach(() => {
    const capacity = 5;
    cache = new LRUCache(capacity);
  });

  test("Cache nodes are inserted and retrievable", () => {
    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(3, 30);

    expect(cache.get(1)).toBe(10);
    expect(cache.get(2)).toBe(20);
    expect(cache.get(3)).toBe(30);
  });

  test("Cache nodes are rearranged after retrieval", () => {
    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(3, 30);
    cache.put(4, 40);
    cache.put(5, 50);

    cache.get(1);
    const lru = cache.peekOldest();
    expect(lru).toEqual(20);

    const mru = cache.peekNewest();
    expect(mru).toEqual(10);
  });

  test("Cache items are evicted when capacity is exhausted", () => {
    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(3, 30);
    cache.put(4, 40);
    cache.put(5, 50);

    cache.put(6, 60); //! Exceeds the capacity
    expect(cache.peekOldest()).toEqual(20);
    expect(cache.peekNewest()).toEqual(60);

    cache.put(7, 70); //! Exceeds the capacity
    expect(cache.peekOldest()).toEqual(30);
    expect(cache.peekNewest()).toEqual(70);

    cache.put(8, 80); //! Exceeds the capacity
    expect(cache.peekOldest()).toEqual(40);
    expect(cache.peekNewest()).toEqual(80);
  });

  test("Peeking newest returns MRU values", () => {
    expect(cache.peekNewest()).toEqual(null);
    cache.put(1, 10);
    expect(cache.peekNewest()).toEqual(10);

    cache.put(2, 20);
    expect(cache.peekNewest()).toEqual(20);

    cache.put(3, 30);
    expect(cache.peekNewest()).toEqual(30);
  });

  test("Peeking oldest returns LRU values", () => {
    expect(cache.peekOldest()).toEqual(null);
    cache.put(1, 10);
    expect(cache.peekOldest()).toEqual(cache.peekNewest());

    cache.put(2, 20);
    cache.put(3, 30);
    expect(cache.peekOldest()).toEqual(10);
  });

  test("Cache is cleared", () => {
    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(3, 30);
    cache.put(4, 40);
    cache.put(5, 50);

    cache.clear();
    expect(cache.peekNewest()).toBe(null);
    expect(cache.peekOldest()).toBe(null);
    expect(cache.get(1)).toBe(null);
    expect(cache.get(2)).toBe(null);
    expect(cache.get(3)).toBe(null);
    expect(cache.get(4)).toBe(null);
    expect(cache.get(5)).toBe(null);
  });
});

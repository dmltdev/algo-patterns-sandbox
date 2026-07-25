import { createHashSet } from "./HashSet.ts";
import { describe, beforeEach, test, expect } from "vitest";

describe("HashSet", () => {
  let set;

  beforeEach(() => {
    set = createHashSet();
  });

  test("Elements are added and can be retrieved", () => {
    set.add("1");
    expect(set.has("1")).toBeTruthy();

    set.add(2);
    expect(set.has(2)).toBeTruthy();

    const symbol = Symbol("foo");
    set.add(symbol);
    expect(set.has(symbol)).toBeTruthy();
  });

  test("Elements are removed from", () => {
    set.add(1);
    set.add(2);
    set.add(3);

    set.remove(1);
    expect(set.has(1)).toBeFalsy();
    set.remove(2);
    expect(set.has(2)).toBeFalsy();
    set.remove(3);
    expect(set.has(3)).toBeFalsy();
  });

  test("Hash set is cleared", () => {
    set.add(1);
    set.add(2);
    set.add(3);

    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
    expect(set.has(3)).toBe(true);

    set.clear();

    expect(set.has(1)).toBe(false);
    expect(set.has(2)).toBe(false);
    expect(set.has(3)).toBe(false);
  });

  test("Iterator works correctly with hash set", () => {
    set.add(1);
    set.add(2);
    set.add(3);

    let iterator = set.iterator();

    expect(iterator.next().value).toBe("1");
    expect(iterator.next().value).toBe("2");
    expect(iterator.next().value).toBe("3");

    expect(iterator.next().value).toBeUndefined();
    expect(iterator.next().done).toBeTruthy();

    iterator.reset();

    expect(iterator.next().value).toBe("1");
    expect(iterator.next().value).toBe("2");
    expect(iterator.next().value).toBe("3");

    expect(iterator.next().value).toBeUndefined();
    expect(iterator.next().done).toBeTruthy();
  });
});

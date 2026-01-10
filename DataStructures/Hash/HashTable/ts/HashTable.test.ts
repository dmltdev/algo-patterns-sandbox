import { createHashTable } from "./HashTable.ts";
import { describe, beforeEach, test, expect, afterAll, vi } from "vitest";

describe("Hash Table", () => {
  const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});

  let ht;

  beforeEach(() => {
    ht = createHashTable();
  });

  afterAll(() => {
    consoleMock.mockReset();
  });

  test("Hashes the key", () => {
    const key = "Paris";
    const hash = ht.hash(key);

    ht.set(key, 150);

    const retrievedValue = ht.get(key);
    const retrievedHash = ht.hash(key);

    expect(retrievedValue).toEqual(150);
    expect(retrievedHash).toEqual(hash);
  });

  test("Gets and sets new pairs to the table", () => {
    ht.set("apple", 50);
    ht.set("banana", 30);
    ht.set("orange", 70);

    expect(ht.get("apple")).toEqual(50);
    expect(ht.get("banana")).toEqual(30);
    expect(ht.get("orange")).toEqual(70);
  });

  test("Avoids hash collisions using chaining", () => {
    ht.set("listen", 100);
    ht.set("silent", 200);

    expect(ht.get("listen")).toEqual(100);
    expect(ht.get("silent")).toEqual(200);
  });

  test("Avoids hash collisions using open addressing", () => {
    ht.set("team", 50);
    ht.set("meat", 75);

    expect(ht.get("team")).toEqual(50);
    expect(ht.get("meat")).toEqual(75);
  });

  test("Gets size", () => {
    expect(ht.getSize()).toEqual(0);
    ht.set("dummy", 100);
    expect(ht.getSize()).toEqual(1);
  });

  test("Removes items", () => {
    ht.set("dummy", 100);
    let item = ht.get("dummy");
    expect(ht.remove("dummy")).toBeTruthy();
    expect(ht.remove("dummy")).toBeFalsy();
  });

  test("Displays items", () => {
    ht.set("apple", 50);
    ht.set("banana", 30);
    ht.set("orange", 70);

    ht.display();

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[ apple: 50 ]")
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[ banana: 30 ]")
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[ orange: 70 ]")
    );
  });
});

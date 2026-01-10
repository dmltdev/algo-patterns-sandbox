import { describe, test, beforeEach, expect } from "vitest";
import { SinglyLinkedList } from "./SinglyLinkedList.ts";

describe("Singly Linked List", () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>();
  });

  test("initializes empty", () => {
    expect(list.getHead()).toBeNull();
  });

  test("inserts new nodes correctly", () => {
    list.insert(1);
    expect(list.getHead()?.data).toBe(1);
    expect(list.getHead()?.next).toBe(null);
  });

  test("calculates length correctly", () => {
    expect(list.length).toBe(0);
    list.insert(1);
    list.insert(2);
    expect(list.length).toBe(2);
  });

  test("clears the list", () => {
    list.clear();
    expect(list.getHead()).toBeNull();
    expect(list.length).toBe(0);
  });

  test("gets the tail node", () => {
    expect(list.getTail()).toBeNull();
    list.insert(1);
    list.insert(2);
    expect(list.getTail()?.data).toBe(1);
  });

  test("reverses the list", () => {
    list.insert(1);
    list.insert(2);
    list.reverse();
    expect(list.getHead()?.data).toBe(1);
    expect(list.getHead()?.next?.data).toBe(2);
  });

  test("handles reverse on empty list", () => {
    const emptyList = new SinglyLinkedList<number>();
    emptyList.reverse();
    expect(emptyList.getHead()).toBeNull();
  });

  test("handles tail retrieval on empty list", () => {
    const emptyList = new SinglyLinkedList<number>();
    expect(emptyList.getTail()).toBeNull();
  });
});

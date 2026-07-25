import { describe, beforeEach, it, expect } from "vitest";
import { CircularLinkedList } from "./CircularLinkedList.ts";

describe("CircularLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new CircularLinkedList();
  });

  it("initializes an empty list", () => {
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expect(list.getLength()).toBe(0);
  });

  it("inserts items at head", () => {
    list.insertAtHead(1);
    expect(list.getHead().value).toBe(1);
    expect(list.getTail().value).toBe(1);
    expect(list.getLength()).toBe(1);

    list.insertAtHead(2);
    expect(list.getHead().value).toBe(2);
    expect(list.getTail().value).toBe(1);
    expect(list.getTail().next.value).toBe(2);
    expect(list.getLength()).toBe(2);
  });

  it("inserts items at tail", () => {
    list.insertAtTail(1);
    expect(list.getHead().value).toBe(1);
    expect(list.getTail().value).toBe(1);
    expect(list.getLength()).toBe(1);

    list.insertAtTail(2);
    expect(list.getHead().value).toBe(1);
    expect(list.getTail().value).toBe(2);
    expect(list.getHead().prev.value).toBe(2);
    expect(list.getLength()).toBe(2);
  });

  it("removes items from head", () => {
    list.insertAtHead(1);
    list.insertAtHead(2);
    const removed = list.removeAtHead();
    expect(removed.value).toBe(2);
    expect(list.getHead().value).toBe(1);
    expect(list.getLength()).toBe(1);
  });

  it("removes items from tail", () => {
    list.insertAtTail(1);
    list.insertAtTail(2);
    const removed = list.removeAtTail();
    expect(removed.value).toBe(2);
    expect(list.getTail().value).toBe(1);
    expect(list.getLength()).toBe(1);
  });

  it("handles edge cases for removing from an empty list", () => {
    expect(list.removeAtHead()).toBeNull();
    expect(list.removeAtTail()).toBeNull();
  });

  it("handles single item list correctly", () => {
    list.insertAtHead(1);
    const head = list.removeAtHead();
    expect(head.value).toBe(1);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expect(list.getLength()).toBe(0);

    list.insertAtTail(2);
    const tail = list.removeAtTail();
    expect(tail.value).toBe(2);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expect(list.getLength()).toBe(0);
  });

  it("empty list is not circular", () => {
    expect(list.isCircular()).toBeFalsy();
  });

  it("linked list is truly circular", () => {
    list.insertAtHead(1);
    list.insertAtHead(2);
    list.insertAtTail(3);
    expect(list.isCircular()).toBeTruthy();
  });
});

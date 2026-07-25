import { describe, test, it, expect, beforeEach } from "vitest";
import { Deque } from "./Deque";

describe("Data Structure: Deque", () => {
  let deque;

  beforeEach(() => {
    deque = new Deque();
  });

  test("isEmpty returns correct results", () => {
    expect(deque.isEmpty()).toBe(true);
    deque.addFront(1);
    expect(deque.isEmpty()).toBe(false);
  });

  test("addFront adds new items to the front of the deque", () => {
    deque.addFront(1);
    expect(deque.getSize()).toBe(1);
    expect(deque.peekFront()).toBe(1);

    deque.addFront(2);
    expect(deque.getSize()).toBe(2);
    expect(deque.peekFront()).toBe(2);
  });

  test("addRear adds new items to the back of the deque", () => {
    expect(deque.getSize()).toBe(0);

    deque.addRear(1);
    expect(deque.getSize()).toBe(1);
    expect(deque.peekRear()).toBe(1);

    deque.addRear(2);
    expect(deque.getSize()).toBe(2);
    expect(deque.peekRear()).toBe(2);
  });

  test("removeFront removes the first item in the deque and returns it", () => {
    deque.addFront(1);
    deque.addFront(2);
    deque.addFront(3);
    expect(deque.getSize()).toEqual(3);
    expect(deque.peekFront()).toEqual(3);

    deque.removeFront();
    expect(deque.getSize()).toEqual(2);
    expect(deque.peekFront()).toEqual(2);

    deque.removeFront();
    expect(deque.getSize()).toEqual(1);
    expect(deque.peekFront()).toEqual(1);

    deque.removeFront();
    expect(deque.getSize()).toEqual(0);
    expect(deque.peekFront()).toEqual(null);
  });

  test("removeRear removes the first item in the deque and returns it", () => {
    deque.addRear(1);
    deque.addRear(2);
    deque.addRear(3);
    expect(deque.getSize()).toEqual(3);
    expect(deque.peekRear()).toEqual(3);

    expect(deque.removeRear()).toEqual(3);
    expect(deque.getSize()).toEqual(2);
    expect(deque.peekRear()).toEqual(2);

    expect(deque.removeRear()).toEqual(2);
    expect(deque.getSize()).toEqual(1);
    expect(deque.peekRear()).toEqual(1);

    expect(deque.removeRear()).toEqual(1);
    expect(deque.getSize()).toEqual(0);
    expect(deque.peekRear()).toEqual(null);

    expect(deque.removeRear()).toBe(null);
  });
});

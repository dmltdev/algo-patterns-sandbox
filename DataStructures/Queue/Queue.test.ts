import { describe, it, expect, beforeEach } from "vitest";
import { Queue } from "./Queue";

describe("Queue", () => {
  let queue: Queue;

  beforeEach(() => {
    const capacity = 3;
    queue = new Queue(capacity);
  });

  it("enqueues and dequeues elements", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBeUndefined();
  });

  it("returns the length of the queue", () => {
    expect(queue.length).toBe(0);

    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.length).toBe(2);

    queue.dequeue();
    expect(queue.length).toBe(1);
  });

  it("peeks at the front element", () => {
    expect(queue.peek()).toBeUndefined();

    queue.enqueue(1);
    expect(queue.peek()).toBe(1);

    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
  });

  it("isEmpty checks if the queue is empty", () => {
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    expect(queue.isEmpty()).toBeFalsy();
  });

  it("isFull checks if the queue is full", () => {
    expect(queue.isFull()).toBeFalsy();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.isFull()).toBeTruthy();
  });

  it("enqueue does not add items to the queue when capacity is reached", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.isFull()).toBeTruthy();
    expect(queue.enqueue(4)).toBe(null);
    expect(queue.peek()).toBe(1);
  });
});

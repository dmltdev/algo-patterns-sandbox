import LinkedList, {
  listFromValues,
  printLinkedList,
  printLinkedListInReverse,
} from "./DoublyLinkedList.ts";

describe("Doubly Linked List", () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  it("#Instantiates", () => {
    expect(linkedList.head).toBe(null);
    expect(linkedList.tail).toBe(null);
    expect(linkedList.length).toBe(0);
  });

  it("#insertAtHead", () => {
    linkedList.insertAtHead(1);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.length).toBe(1);

    linkedList.insertAtHead(2);
    expect(linkedList.head.value).toBe(2);
    expect(linkedList.head.next.value).toBe(1);
    expect(linkedList.length).toBe(2);
  });

  it("#insertAtTail", () => {
    linkedList.insertAtTail(1);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.length).toBe(1);

    linkedList.insertAtTail(2);
    expect(linkedList.tail.value).toBe(2);
    expect(linkedList.tail.prev.value).toBe(1);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(2);
    expect(linkedList.length).toBe(2);
  });

  it("#pop", () => {
    expect(linkedList.pop()).toBeNull();
    expect(linkedList.length).toBe(0);

    linkedList.insertAtTail(1);
    expect(linkedList.pop().value).toBe(1);
    expect(linkedList.length).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.insertAtTail(1);
    linkedList.insertAtTail(2);
    linkedList.insertAtTail(3);
    expect(linkedList.pop().value).toBe(3);
    expect(linkedList.pop().value).toBe(2);
    expect(linkedList.pop().value).toBe(1);
    expect(linkedList.pop()).toBeNull();
    expect(linkedList.length).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("#shift", () => {
    expect(linkedList.shift()).toBeNull();
    expect(linkedList.length).toBe(0);

    linkedList.insertAtTail(1);
    expect(linkedList.shift()?.value).toBe(1);
    expect(linkedList.length).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.insertAtTail(1);
    linkedList.insertAtTail(2);
    linkedList.insertAtTail(3);
    expect(linkedList.shift()?.value).toBe(1);
    expect(linkedList.shift()?.value).toBe(2);
    expect(linkedList.shift()?.value).toBe(3);
    expect(linkedList.shift()).toBeNull();
    expect(linkedList.length).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("#getHead", () => {
    expect(linkedList.getHead()).toBeNull();

    linkedList.insertAtTail(1);
    expect(linkedList.getHead()?.value).toBe(1);

    linkedList.insertAtTail(2);
    linkedList.insertAtTail(3);
    expect(linkedList.getHead()?.value).toBe(1);
  });

  it("#getTail", () => {
    expect(linkedList.getTail()).toBeNull();

    linkedList.insertAtTail(1);
    expect(linkedList.getTail()?.value).toBe(1);

    linkedList.insertAtTail(2);
    linkedList.insertAtTail(3);
    expect(linkedList.getTail()?.value).toBe(3);
  });

  it("#reverse", () => {
    linkedList.insertAtTail(1);
    linkedList.insertAtTail(2);
    linkedList.insertAtTail(3);
    expect(linkedList.getHead().value).toBe(1);
    expect(linkedList.getTail().value).toBe(3);

    linkedList.reverse();
    expect(linkedList.getHead().value).toBe(3);
    expect(linkedList.getTail().value).toBe(1);
  });

  it("Handles generic types", () => {
    const stringList = new LinkedList<string>();
    stringList.insertAtTail("hello");
    expect(stringList.getHead()?.value).toBe("hello");

    const objectList = new LinkedList<{ name: string; age: number }>();
    objectList.insertAtTail({ name: "Alex", age: 25 });
    expect(objectList.getHead()?.value.name).toBe("Alex");
    expect(objectList.getHead()?.value.age).toBe(25);
  });

  it("Creates a linked list from values", () => {
    const values = [1, 2, 3];
    const newList = listFromValues(...values);
    expect(newList.getLength()).toBe(values.length);

    let node = newList.getHead()!;
    expect(node.value).toBe(values.shift());
  });

  it("Prints linked list", () => {
    const values = [1, 2, 3];
    const newList = listFromValues(...values);
    // Redirect console.log output to capture it
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    printLinkedList(newList);

    // Check if console.log was called with the correct values
    expect(consoleLogSpy).toHaveBeenCalledTimes(values.length);
    values.forEach((value, index) => {
      expect(consoleLogSpy).toHaveBeenNthCalledWith(index + 1, value);
    });

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });

  it("Prints linked list in reverse", () => {
    const values = [1, 2, 3];
    const newList = listFromValues(...values);
    // Redirect console.log output to capture it
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    printLinkedListInReverse(newList);

    // Check if console.log was called with the correct values in reverse order
    expect(consoleLogSpy).toHaveBeenCalledTimes(values.length);
    values.reverse().forEach((value, index) => {
      expect(consoleLogSpy).toHaveBeenNthCalledWith(index + 1, value);
    });

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });
});

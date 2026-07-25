import { TreeTraversal } from "./TreeTraversal";
import { describe, test, beforeEach, afterEach, expect } from "vitest";

describe("TreeTraversal", () => {
  let consoleOutput: string[] = [];
  const originalLog = console.log;

  beforeEach(() => {
    consoleOutput = [];
    console.log = (output: string) => consoleOutput.push(output);
  });

  afterEach(() => {
    console.log = originalLog;
  });

  test("inorder traversal", () => {
    const root = new TreeTraversal(1);
    const left = new TreeTraversal(2);
    const right = new TreeTraversal(3);
    const leftLeft = new TreeTraversal(4);
    const leftRight = new TreeTraversal(5);

    root.left = left;
    root.right = right;
    left.left = leftLeft;
    left.right = leftRight;

    root.inorder(root);

    expect(consoleOutput).toEqual(["4", "2", "5", "1", "3"]);
  });

  test("postorder traversal", () => {
    const root = new TreeTraversal(1);
    const left = new TreeTraversal(2);
    const right = new TreeTraversal(3);
    const leftLeft = new TreeTraversal(4);
    const leftRight = new TreeTraversal(5);

    root.left = left;
    root.right = right;
    left.left = leftLeft;
    left.right = leftRight;

    root.postorder(root);

    expect(consoleOutput).toEqual(["4", "5", "2", "3", "1"]);
  });

  test("inorder traversal with single node", () => {
    const root = new TreeTraversal(1);

    root.inorder(root);

    expect(consoleOutput).toEqual(["1"]);
  });

  test("postorder traversal with single node", () => {
    const root = new TreeTraversal(1);

    root.postorder(root);

    expect(consoleOutput).toEqual(["1"]);
  });

  test("inorder traversal with empty tree", () => {
    const root = new TreeTraversal(1);

    root.inorder(null);

    expect(consoleOutput).toEqual([]);
  });

  test("postorder traversal with empty tree", () => {
    const root = new TreeTraversal(1);

    root.postorder(null);

    expect(consoleOutput).toEqual([]);
  });
});

type Comparator<T> = (a: T, b: T) => number;

class BinaryTreeNode<T> {
  public left: BinaryTreeNode<T> | null = null;
  public right: BinaryTreeNode<T> | null = null;

  constructor(public readonly value: T) { };
}

export class BinaryTree<T> {
  private root: BinaryTreeNode<T> | null = null;
  public size = 0;

  constructor(private readonly compare: Comparator<T>) { }

  insert(value: T): boolean {
    const node = new BinaryTreeNode(value);

    if (this.root === null) {
      this.root = node;
      this.size++;
      return true
    }

    let current = this.root;

    while (true) {
      const result = this.compare(value, current.value);

      if (result === 0) {
        return false;
      }

      if (result < 0) {
        if (current.left === null) {
          current.left = node;
          this.size++;
          return true;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          this.size++;
          return true;
        }

        current = current.right;
      }
    }
  }

  has(value: T): boolean {
    let current = this.root;

    while (current !== null) {
      const result = this.compare(value, current.value);

      if (result === 0) {
        return true;
      }

      current = result < 0 ? current.left : current.right;
    }

    return false;
  }

  inOrder(): T[] {
    const values: T[] = [];

    const visit = (node: BinaryTreeNode<T> | null): void => {
      if (node === null) {
        return;
      }

      visit(node.left);
      values.push(node.value);
      visit(node.right);
    }

    visit(this.root);

    return values;
  }
}

const tree = new BinaryTree<number>((a, b) => a - b);

tree.insert(10);
tree.insert(5);
tree.insert(15);

console.log(tree.has(5)); // true
console.log(tree.has(7)); // false
console.log(tree.inOrder()); // [5, 10, 15]

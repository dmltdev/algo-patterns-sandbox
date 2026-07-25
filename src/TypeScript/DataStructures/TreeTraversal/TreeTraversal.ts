export class TreeTraversal<T extends TreeTraversal<T>> {
  public left: T | null;
  public right: T | null;
  private value: any;

  constructor(value: any) {
    this.left = null;
    this.right = null;
    this.value = value;
  }

  /**
   * Inorder tree traversal
   * @description Visits all the nodes in the left substree, then the root node, and finally all the nodes in the right substree
   *
   * @param {(T | null)} head
   */
  inorder(head: T | null) {
    if (head) {
      this.inorder(head.left as T);
      if (!head.right && !head.left) {
        console.log(String(head.value));
      } else {
        console.log(String(head.value));
      }
      this.inorder(head.right as T);
    }
  }

  /**
   * Postorder tree traversal
   * @description Visits all the nodes in the left substree, then all the nodes in the right substree, and finally the root node of the tree.
   *
   * @param {(T | null)} head
   */
  postorder(head: T | null) {
    if (head) {
      this.postorder(head.left as T);
      this.postorder(head.right as T);
      console.log(String(head.value));
    }
  }
}

const root = new TreeTraversal(1);
const left = new TreeTraversal(2);
const right = new TreeTraversal(3);

root.left = left;
root.right = right;

root.inorder(root);
root.postorder(root);

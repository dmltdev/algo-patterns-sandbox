/*
Floyd's cycle-finding algorithm, also known as the "tortoise and the hare" algorithm, 
to detect loops in a linked list. 
It uses two pointers, slowPtr and fastPtr, starting from the head of the linked list.
The slowPtr moves one step at a time, while the fastPtr moves two steps at a time. 
If there is a loop in the linked list, eventually, the fastPtr will catch up to the slowPtr inside the loop.
*/

import LinkedList, { ListNode } from "../DoublyLinkedList/ts/DoublyLinkedList.ts";

function detectLoop<T>(head: ListNode<T> | null) {
  let slowPtr = head;
  let fastPtr = head;

  while (fastPtr !== null && fastPtr.next !== null) {
    slowPtr = slowPtr!.next;
    fastPtr = fastPtr.next!.next;

    if (slowPtr === fastPtr) {
      return true;
    }
  }

  return false;
}

//! Alternative implementation with a set
// function detectLoop2<T>(head: ListNode<T> | null) {
//   const set = new Set();

//   while (head) {
//     if (set.has(head)) {
//       return true;
//     }

//     set.add(head);
//     head = head.next;
//   }

//   return false;
// }

//! Requires adding the seen property to the LinkedList
// function detectLoop3<T>(head: ListNode<T>) {
//   let current = head;

//   while (current) {
//     if (current.seen) {
//       return true;
//     }
//     current.seen = true;
//     current = current.next;
//   }

//   return false;
// }

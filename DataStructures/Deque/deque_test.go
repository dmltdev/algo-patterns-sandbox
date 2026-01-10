package deque

import (
	"testing"
)

func TestDeque(t *testing.T) {
	deque := Deque{}

	if !deque.isEmpty() {
		t.Error("Expected deque to be empty")
	}

	if deque.size() != 0 {
		t.Error("Expected deque's size to be 0")
	}

	if deque.removeFront() != 0 {
		t.Error("Expected deque to return 0 immediately")
	}

	if deque.removeRear() != 0 {
		t.Error("Expected deque to return 0 immediately")
	}

	if deque.peekFront() != 0 {
		t.Error("Expected front of deque to be 0")
	}
	
	if deque.peekRear() != 0 {
		t.Error("Expected rear of deque to be 0")
	}

	deque.addRear(1)
	deque.addFront(2)
	if deque.peekFront() != 2 {
		t.Error("Expected front of deque to be 2")
	}

	if deque.peekRear() != 1 {
		t.Error("Expected rear of deque to be 1")
	}

	if deque.isEmpty() || deque.items[0] != 2 || deque.items[1] != 1 {
		t.Error("Unexpected state after adding elements")
	}

	front := deque.removeFront()
	if front != 2 || deque.items[0] != 1 {
		t.Error("Unexpected state after removeFront")
	}

	rear := deque.removeRear() 
	if rear != 1 || !deque.isEmpty() {
		t.Error("Unexpected state after removeRear")
	}
}
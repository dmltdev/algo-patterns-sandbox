from queue import Queue
import pytest

@pytest.fixture
def empty_queue():
  capacity: int = 3
  return Queue(capacity)

@pytest.fixture
def filled_queue():
  capacity: int = 3
  queue = Queue(capacity)
  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  return queue

def test_is_empty(empty_queue):
  assert empty_queue.isEmpty() == True
  
def test_is_full(filled_queue):
  assert filled_queue.isFull() == True
  
def test_peek(empty_queue, filled_queue):
  assert empty_queue.peek() == None
  assert filled_queue.peek() == 1
  
def test_enqueue(empty_queue):
  empty_queue.enqueue(1)
  empty_queue.enqueue(2)
  empty_queue.enqueue(3)
  assert empty_queue.peek() == 1
  empty_queue.enqueue(4)
  assert empty_queue.queue[-1] == 3
  
def test_dequeue(filled_queue):
  assert filled_queue.dequeue() == 1
  assert filled_queue.dequeue() == 2
  assert filled_queue.dequeue() == 3
  assert filled_queue.dequeue() == None
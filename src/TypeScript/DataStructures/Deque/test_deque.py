from deque import Deque
import pytest

@pytest.fixture
def empty_deque():
  return Deque()

@pytest.fixture
def filled_deque():
  deque = Deque()
  deque.addFront(2)
  deque.addRear(3)
  deque.addFront(1)
  return deque

def test_is_empty(empty_deque):
  assert empty_deque.isEmpty() == True
  
def test_add_rear(empty_deque):
  empty_deque.addRear(1)
  assert empty_deque.isEmpty() == False
  assert empty_deque.size() == 1
  empty_deque.addRear(2)
  assert empty_deque.size() == 2
  empty_deque.addRear(3)
  assert empty_deque.size() == 3
  
def test_add_front(empty_deque):
  empty_deque.addFront(1)
  assert empty_deque.isEmpty() == False
  assert empty_deque.size() == 1
  empty_deque.addFront(2)
  assert empty_deque.size() == 2
  empty_deque.addFront(3)
  assert empty_deque.size() == 3
  
def test_remove_front(filled_deque):
  assert filled_deque.removeFront() == 1
  assert filled_deque.size() == 2
    
def test_remove_rear(filled_deque):
  assert filled_deque.removeRear() == 3
  assert filled_deque.size() == 2
  
def test_peek_front(filled_deque):
  assert filled_deque.peekFront() == 1
  
def test_peek_back(filled_deque):
  assert filled_deque.peekBack() == 3
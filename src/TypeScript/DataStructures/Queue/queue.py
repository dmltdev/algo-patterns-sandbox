from typing import Any, Optional

class Queue:
  def __init__(self, capacity = 5):
    self.queue = []
    self.capacity = capacity;
    
  def enqueue(self, item: Any) -> None:
    if not self.isFull():
      self.queue.append(item)
  
  def dequeue(self) -> Optional[Any]:
    if self.isEmpty():
      return None
    return self.queue.pop(0)
  
  def size(self) -> int:
    return len(self.queue)
  
  def isEmpty(self) -> bool:
    return self.size() == 0
  
  def isFull(self) -> bool:
    return self.size() == self.capacity
    
  def peek(self) -> Optional[Any]:
    if self.isEmpty():
      return None
    return self.queue[0]
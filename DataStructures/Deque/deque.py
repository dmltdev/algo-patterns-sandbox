from typing import List

class Deque:
  def __init__(self) -> None:
    self.items: List[int] = []
    
  def isEmpty(self) -> bool: 
    return self.items == []
  
  def addRear(self, item: int) -> None:
    self.items.append(item)
    
  def addFront(self, item: int) -> None:
    self.items.insert(0, item)
    
  def removeFront(self) -> int:
    return self.items.pop(0)
  
  def removeRear(self) -> int:
    return self.items.pop()
  
  def size(self) -> int:
    return len(self.items)
  
  def peekFront(self) -> int:
    return self.items[0]
  
  def peekBack(self) -> int:
    return self.items[-1]
from LRUCache import LRUCache
import pytest

@pytest.fixture
def empty_LRUCache():
  capacity = 3
  return LRUCache(capacity)

@pytest.fixture
def filled_LRUCache():
  capacity = 3
  cache = LRUCache(capacity)
  cache.put(1,10)
  cache.put(2,20)
  cache.put(3,30)
  return cache;
  
def test_is_empty(empty_LRUCache):
  assert empty_LRUCache.get(1) == -1
  
def test_get(filled_LRUCache):
  assert filled_LRUCache.get(1) == 10
  assert filled_LRUCache.get(2) == 20
  assert filled_LRUCache.get(3) == 30
  
def test_eviction_policy(filled_LRUCache):
    filled_LRUCache.get(2)
    filled_LRUCache.put(4, 40)
    
    # Has been evicted
    assert filled_LRUCache.get(1) == -1
    
    # Other keys are still present
    assert filled_LRUCache.get(2) == 20
    assert filled_LRUCache.get(3) == 30
    assert filled_LRUCache.get(4) == 40
  
def test_putting_the_same_key(filled_LRUCache):
  filled_LRUCache.put(1, 15)
  assert filled_LRUCache.get(1) == 15
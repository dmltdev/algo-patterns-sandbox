from LRUCache import LRUCache
import random

def test_stress_LRUCache():
    capacity = 10000
    cache = LRUCache(capacity)

    for i in range(capacity):
        cache.put(i, i * 10)

    # Access items from 5000 to 9999 (avoiding first 5000)
    for _ in range(5000):
        key = random.randint(5000, capacity - 1)
        assert cache.get(key) == key * 10

    # Insert additional items to test eviction policy
    for i in range(capacity, capacity + 5000):
        cache.put(i, i * 10)

    # Check if the first 5000 items were evicted
    for i in range(5000):
        assert cache.get(i) == -1  # These should have been evicted

    # Check if new items are present
    for i in range(capacity, capacity + 5000):
        assert cache.get(i) == i * 10
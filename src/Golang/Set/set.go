package main

import "fmt"

type Set struct {
	elements map[string]struct{}
}

func NewSet() *Set {
	return &Set{
		elements: make(map[string]struct{}),
	}
}

func (s *Set) Add (value string) {
	s.elements[value] = struct{}{}
}

func (s *Set) Remove (value string) {
	delete(s.elements, value)
}

func (s *Set) Contains (value string) bool {
	_, found := s.elements[value]
	return found
}

func (s *Set) Size() int {
	return len(s.elements)
}

func (s *Set) List() []string {
	keys := make([]string, 0, len(s.elements))
	for key := range s.elements {
		keys = append(keys, key)
	}
	return keys
}

func (s *Set) Union (other *Set) *Set {
	result := NewSet()
	for key := range s.elements {
		result.Add(key)
	}
	for key := range other.elements {
		result.Add(key)
	}
	return result;
}

func (s *Set) Intersection(other *Set) *Set {
	result := NewSet()
	for key := range s.elements {
		if other.Contains(key) {
			result.Add(key)
		}
	}
	return result;
}

func (s *Set) Difference (other *Set) *Set {
	result := NewSet();
	for key := range s.elements {
		if !other.Contains(key) {
			result.Add(key)
		}
	}
	return result
}

func main() {
	set := NewSet()

	set.Add("1")
	set.Add("2")
	set.Add("3")

	fmt.Println("Contains 1:", set.Contains("1"))
	fmt.Println("Contains 4:", set.Contains("4"))

	fmt.Println("Size:", set.Size())

	fmt.Println("List:", set.List())

	set.Remove("1");
	fmt.Println("Set after removal", set.List())
	fmt.Println("Set size after removal", set.Size())
}
package main

import (
	"errors"
	"fmt"
)

type Stack[T any] struct {
	items []T
}

func New[T any]() *Stack[T] {
	return &Stack[T]{
		items: make([]T, 0),
	}
}

func (s *Stack[T]) Push(item T) {
	s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, error) {
	var zero T

	if s.IsEmpty() {
		return zero, errors.New("stack is empty")
	}

	lastIndex := len(s.items) - 1
	lastItem := s.items[lastIndex]
	s.items = s.items[:lastIndex]

	return lastItem, nil
}

func (s *Stack[T]) Peek() (T, error) {
	var zero T

	if s.IsEmpty() {
		return zero, errors.New("stack is empty")
	}

	return s.items[len(s.items) - 1], nil
}

func (s *Stack[T]) IsEmpty() bool {
	return len(s.items) == 0
}

func (s *Stack[T]) Size() int {
	return len(s.items)
}

func (s *Stack[T]) Print() {
	fmt.Println(s.items)
}

func main() {
	stack := New[int]()
	stack.Push(1)
	stack.Push(2)
	stack.Push(3)
	stack.Print()

	if val, err := stack.Pop(); err == nil {
		fmt.Printf("Popped: %v\n", val)
	}

	stack.Print()

	stringStack := New[string]()
	stringStack.Push("hello")
	stringStack.Push("world")
	stringStack.Print()
}

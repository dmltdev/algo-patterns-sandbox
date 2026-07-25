package deque

type Deque struct {
	items []int
}

func (d *Deque) isEmpty() bool {
	return len(d.items) == 0
}

func (d *Deque) addFront(item int) {
	d.items = append([]int{item}, d.items...)
}

func (d *Deque) addRear(item int) {
	d.items = append(d.items, item)
}

func (d *Deque) removeFront() int {
	if d.isEmpty() {
		return 0
	}
	front := d.items[0]
	d.items = d.items[1:]
	return front
}

func (d *Deque) removeRear() int {
	if d.isEmpty() {
		return 0
	}

	rear := d.items[len(d.items)-1]
	d.items = d.items[:len(d.items)-1]
	return rear
}

func (d *Deque) size() int {
	return len(d.items)
}

func (d * Deque) peekFront() int {
	if d.isEmpty() {
		return 0
	}
	return d.items[0]
}

func (d * Deque) peekRear() int {
	if d.isEmpty() {
		return 0
	}
	return d.items[len(d.items) - 1]
}
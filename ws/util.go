package main

import (
	"math/rand"
)

func NewID() int64 {
	return rand.Int63n(int64(1)<<53)
}

func Int64Remove(a []int64, b int64) []int64 {
	i := Int64FindIndex(a, b)
	if (i >= 0) {
		return append(a[:i], a[i+1:]...)
	} else {
		return a
	}
}

func Int64RemoveIf(a []int64, f func (int64) bool) []int64 {
	var b []int64
	for _, e := range a {
		if (!f(e)) {
			b = append(b, e)
		}
	}
	return b
}

func Int64FindIndex(a []int64, b int64) int {
	for i, e := range a {
		if e == b {
			return i
		}
	}
	return -1
}

func Int64Any(a []int64, f func (int64) bool) bool {
	for _, e := range a {
		if f(e) {
			return true
		}
	}
	return false
}

func IInt64Remove(a [][]int64, b int64) [][]int64 {
	var c [][]int64
	for _, e := range a {
		d := Int64Remove(e, b)
		if (len(d) > 0) {
			c = append(c, d)
		}
	}
	return c
}

func IInt64RemoveIf(a [][]int64, f func (int64) bool) [][]int64 {
	var b [][]int64
	for _, e := range a {
		c := Int64RemoveIf(e, f)
		if (len(c) > 0) {
			b = append(b, c)
		}
	}
	return b
}

func IInt64FindIndex(a [][]int64, b int64) (int, int) {
	for i, e := range a {
		j := Int64FindIndex(e, b)
		if (j >= 0) {
			return i, j
		}
	}
	return -1, -1
}

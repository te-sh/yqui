package main

import (
	"math/rand"
	"time"
)

func SetRandSeed() {
	rand.Seed(time.Now().UnixNano())
}

func NowMilliSec() int64 {
	return time.Now().UnixNano() / 1_000_000
}

func NewID() int64 {
	return rand.Int63n(int64(1) << 53)
}

func IntMax(a int, b int) int {
	if a > b {
		return a
	} else {
		return b
	}
}

func Int64Remove(a []int64, b int64) []int64 {
	i := Int64FindIndex(a, b)
	return Int64RemoveAt(a, i)
}

func Int64RemoveAt(a []int64, i int) []int64 {
	if i >= 0 {
		return append(a[:i], a[i+1:]...)
	} else {
		return a
	}
}

func Int64RemoveIf(a []int64, f func(int64) bool) []int64 {
	var b []int64
	for _, e := range a {
		if !f(e) {
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

func Int64Any(a []int64, f func(int64) bool) bool {
	for _, e := range a {
		if f(e) {
			return true
		}
	}
	return false
}

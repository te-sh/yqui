package main

func Int64RemoveFirst(a []int64, b int64) []int64 {
	i := Int64FindIndex(a, b)
	if (i >= 0) {
		return append(a[:i], a[i+1:]...)
	} else {
		return a
	}
}

func Int64FindIndex(a []int64, b int64) int {
	for i, s := range a {
		if s == b {
			return i
		}
	}
	return -1
}

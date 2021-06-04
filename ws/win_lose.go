package main

type WinLose struct {
	WinNum  int
	LoseNum int
}

func NewWinLose() *WinLose {
	winLose := new(WinLose)
	winLose.Reset()
	return winLose
}

func (winLose *WinLose) Clone() *WinLose {
	newWinLose := *winLose
	return &newWinLose
}

func (winLose *WinLose) Reset() {
	winLose.WinNum = 1
	winLose.LoseNum = 1
}

package main

type WinLose struct {
	WinNum  int
	LoseNum int
}

func NewWinLose() *WinLose {
	winLose := new(WinLose)
	winLose.Reset(nil)
	return winLose
}

func (winLose *WinLose) Clone() *WinLose {
	newWinLose := *winLose
	return &newWinLose
}

func (winLose *WinLose) Reset(clearArg *ClearArg) {
	if clearArg == nil || clearArg.Win {
		winLose.WinNum = 1
	}
	if clearArg == nil || clearArg.Lose {
		winLose.LoseNum = 1
	}
}

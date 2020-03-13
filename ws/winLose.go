package main

type WinLose struct {
	WinNum int
	LoseNum int
	TeamWinNum int
	TeamLoseNum int
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
	winLose.WinNum = 0
	winLose.LoseNum = 0
	winLose.TeamWinNum = 0
	winLose.TeamLoseNum = 0
}

package main

type WinLoseSet struct {
	Player *WinLose
	Team *WinLose
}

type WinLose struct {
	WinNum int
	LoseNum int
}

func NewWinLoseSet() *WinLoseSet {
	winLoseSet := new(WinLoseSet)
	winLoseSet.Player = NewWinLose()
	winLoseSet.Team = NewWinLose()
	return winLoseSet
}

func NewWinLose() *WinLose {
	winLose := new(WinLose)
	winLose.WinNum = 0
	winLose.LoseNum = 0
	return winLose
}

func (winLoseSet *WinLoseSet) Clone() *WinLoseSet {
	newWinLoseSet := *winLoseSet
	newWinLoseSet.Player = winLoseSet.Player.Clone()
	newWinLoseSet.Team = winLoseSet.Team.Clone()
	return &newWinLoseSet
}

func (winLose *WinLose) Clone() *WinLose {
	newWinLose := *winLose
	return &newWinLose
}

func (winLoseSet *WinLoseSet) Reset() {
	winLoseSet.Player = NewWinLose()
	winLoseSet.Team = NewWinLose()
}

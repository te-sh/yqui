package main

type WinLose struct {
	Player *WinLoseInfo
	Team *WinLoseInfo
}

type WinLoseInfo struct {
	WinNum int
	LoseNum int
}

func NewWinLose() *WinLose {
	winLose := new(WinLose)
	winLose.Player = NewWinLoseInfo()
	winLose.Team = NewWinLoseInfo()
	return winLose
}

func NewWinLoseInfo() *WinLoseInfo {
	winLoseInfo := new(WinLoseInfo)
	winLoseInfo.WinNum = 0
	winLoseInfo.LoseNum = 0
	return winLoseInfo
}

func (winLose *WinLose) Clone() *WinLose {
	newWinLose := *winLose
	newWinLose.Player = winLose.Player.Clone()
	newWinLose.Team = winLose.Team.Clone()
	return &newWinLose
}

func (winLoseInfo *WinLoseInfo) Clone() *WinLoseInfo {
	newWinLoseInfo := *winLoseInfo
	return &newWinLoseInfo
}

func (winLose *WinLose) Reset() {
	winLose.Player = NewWinLoseInfo()
	winLose.Team = NewWinLoseInfo()
}

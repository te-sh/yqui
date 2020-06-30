package main

type Rule struct {
	RightNum int `json:"rightNum"`
	PointCorrect int `json:"pointCorrect"`
	BonusCorrect string `json:"bonusCorrect"`
	PointWrong int `json:"pointWrong"`
	BatsuWrong int `json:"batsuWrong"`
	LockWrong int `json:"lockWrong"`
	WinPoint ActiveAndValue `json:"winPoint"`
	LosePoint ActiveAndValue `json:"losePoint"`
	LoseBatsu ActiveAndValue `json:"loseBatsu"`
	ShowPoint bool `json:"showPoint"`
	Team bool `json:"team"`
	TeamShareButton bool `json:"teamShareButton"`
	TeamPoint string `json:"teamPoint"`
	TeamBatsu string `json:"teamBatsu"`
	TeamShareLock bool `json:"teamShareLock"`
	TeamWinPoint ActiveAndValue `json:"teamWinPoint"`
	TeamLosePoint ActiveAndValue `json:"teamLosePoint"`
	TeamLoseBatsu ActiveAndValue `json:"teamLoseBatsu"`
	Board bool `json:"board"`
	BoardPointCorrect int `json:"boardPointCorrect"`
	BoardApplyNormal bool `json:"boardApplyNormal"`
}

type ActiveAndValue struct {
	Active bool `json:"active"`
	Value int `json:"value"`
}

func NewRule() *Rule {
	rule := new(Rule)
	rule.RightNum = 1
	rule.PointCorrect = 1
	rule.BonusCorrect = "none"
	rule.PointWrong = 0
	rule.BatsuWrong = 1
	rule.LockWrong = 0
	rule.WinPoint = ActiveAndValue{true, 7}
	rule.LosePoint = ActiveAndValue{false, 0}
	rule.LoseBatsu = ActiveAndValue{true, 3}
	rule.ShowPoint = true
	rule.Team = false
	rule.TeamShareButton = false
	rule.TeamPoint = "sum"
	rule.TeamBatsu = "sum"
	rule.TeamShareLock = true
	rule.TeamWinPoint = ActiveAndValue{true, 7}
	rule.TeamLosePoint = ActiveAndValue{false, 0}
	rule.TeamLoseBatsu = ActiveAndValue{true, 3}
	rule.Board = false
	rule.BoardPointCorrect = 1
	rule.BoardApplyNormal = true
	return rule
}

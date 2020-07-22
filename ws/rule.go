package main

type Rule struct {
	RightNum  int         `json:"rightNum"`
	Player    *PlayerRule `json:"player"`
	Team      *TeamRule   `json:"team"`
	Board     *BoardRule  `json:"board"`
	ShowPoint bool        `json:"showPoint"`
}

type PlayerRule struct {
	PointCorrect int    `json:"pointCorrect"`
	BonusCorrect string `json:"bonusCorrect"`
	PointWrong   int    `json:"pointWrong"`
	BatsuWrong   int    `json:"batsuWrong"`
	LockWrong    int    `json:"lockWrong"`
	WinLoseRule
}

type TeamRule struct {
	Active      bool   `json:"active"`
	ShareButton bool   `json:"shareButton"`
	Point       string `json:"point"`
	Batsu       string `json:"batsu"`
	ShareLock   bool   `json:"shareLock"`
	WinLoseRule
}

type BoardRule struct {
	Active       bool `json:"active"`
	PointCorrect int  `json:"pointCorrect"`
	ApplyNormal  bool `json:"applyNormal"`
}

type WinLoseRule struct {
	WinPoint  ActiveAndValue `json:"winPoint"`
	LosePoint ActiveAndValue `json:"losePoint"`
	LoseBatsu ActiveAndValue `json:"loseBatsu"`
}

type ActiveAndValue struct {
	Active bool `json:"active"`
	Value  int  `json:"value"`
}

func NewRule() *Rule {
	rule := new(Rule)
	rule.RightNum = 1
	rule.Player = NewPlayerRule()
	rule.Team = NewTeamRule()
	rule.Board = NewBoardRule()
	rule.ShowPoint = true
	return rule
}

func NewPlayerRule() *PlayerRule {
	rule := new(PlayerRule)
	rule.PointCorrect = 1
	rule.BonusCorrect = "none"
	rule.PointWrong = 0
	rule.BatsuWrong = 1
	rule.LockWrong = 0
	rule.WinPoint = ActiveAndValue{true, 7}
	rule.LosePoint = ActiveAndValue{false, 0}
	rule.LoseBatsu = ActiveAndValue{true, 3}
	return rule
}

func NewTeamRule() *TeamRule {
	rule := new(TeamRule)
	rule.Active = false
	rule.ShareButton = false
	rule.Point = "sum"
	rule.Batsu = "sum"
	rule.ShareLock = true
	rule.WinPoint = ActiveAndValue{true, 7}
	rule.LosePoint = ActiveAndValue{false, 0}
	rule.LoseBatsu = ActiveAndValue{true, 3}
	return rule
}

func NewBoardRule() *BoardRule {
	rule := new(BoardRule)
	rule.Active = false
	rule.PointCorrect = 1
	rule.ApplyNormal = true
	return rule
}

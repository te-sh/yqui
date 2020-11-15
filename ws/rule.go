package main

type Rule struct {
	RightNum  int         `json:"rightNum"`
	Player    *NormalRule `json:"player"`
	Team      *TeamRule   `json:"team"`
	Board     *BoardRule  `json:"board"`
	Other     *OtherRule  `json:"other"`
	ShowPoint bool        `json:"showPoint"`
}

type NormalRule struct {
	InitPoint    int    `json:"initPoint"`
	InitBatsu    int    `json:"initBatsu"`
	PointCorrect int    `json:"pointCorrect"`
	BonusCorrect string `json:"bonusCorrect"`
	PointWrong   int    `json:"pointWrong"`
	BatsuWrong   int    `json:"batsuWrong"`
	LockWrong    int    `json:"lockWrong"`
	Updown       bool   `json:"updown"`
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

type OtherRule struct {
	Timer *TimerRule `json:"timer"`
}

type TimerRule struct {
	Active bool `json:"active"`
	Min    int  `json:"min"`
	Sec    int  `json:"sec"`
}

type WinLoseRule struct {
	WinPlayers int            `json:"winPlayers"`
	PassQuiz   bool           `json:"passQuiz"`
	WinPoint   ActiveAndValue `json:"winPoint"`
	LosePoint  ActiveAndValue `json:"losePoint"`
	LoseBatsu  ActiveAndValue `json:"loseBatsu"`
}

type ActiveAndValue struct {
	Active bool `json:"active"`
	Value  int  `json:"value"`
}

func NewRule() *Rule {
	rule := new(Rule)
	rule.RightNum = 1
	rule.Player = NewNormalRule()
	rule.Team = NewTeamRule()
	rule.Board = NewBoardRule()
	rule.Other = NewOtherRule()
	rule.ShowPoint = true
	return rule
}

func NewNormalRule() *NormalRule {
	rule := new(NormalRule)
	rule.PointCorrect = 1
	rule.BonusCorrect = "none"
	rule.PointWrong = 0
	rule.BatsuWrong = 1
	rule.LockWrong = 0
	rule.Updown = false
	rule.WinPlayers = 0
	rule.PassQuiz = false
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
	rule.WinPlayers = 0
	rule.PassQuiz = false
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

func NewOtherRule() *OtherRule {
	rule := new(OtherRule)
	rule.Timer = NewTimerRule()
	return rule
}

func NewTimerRule() *TimerRule {
	rule := new(TimerRule)
	rule.Active = false
	rule.Min = 0
	rule.Sec = 0
	return rule
}

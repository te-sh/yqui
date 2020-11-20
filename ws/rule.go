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
	InitPoint      int                 `json:"initPoint"`
	InitBatsu      int                 `json:"initBatsu"`
	PointCorrect   int                 `json:"pointCorrect"`
	PointWrong     int                 `json:"pointWrong"`
	BatsuWrong     int                 `json:"batsuWrong"`
	LockWrong      int                 `json:"lockWrong"`
	SpecialCorrect *SpecialCorrectRule `json:"specialCorrect"`
	SpecialWrong   *SpecialWrongRule   `json:"specialWrong"`
	Comprehensive  *ComprehensiveRule  `json:"comprehensive"`
	WinLoseRule
}

type SpecialCorrectRule struct {
	ConsBonus bool           `json:"consBonus"`
	Survival  ActiveAndValue `json:"survival"`
}

type SpecialWrongRule struct {
	Updown  bool `json:"updown"`
	Swedish bool `json:"swedish"`
	Divide  bool `json:"divide"`
}

type ComprehensiveRule struct {
	Active   bool        `json:"active"`
	Calc     string      `json:"calc"`
	WinPoint WinLoseCond `json:"winPoint"`
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
	PassQuiz bool       `json:"passQuiz"`
	Timer    *TimerRule `json:"timer"`
}

type TimerRule struct {
	Active bool `json:"active"`
	Min    int  `json:"min"`
	Sec    int  `json:"sec"`
}

type WinLoseRule struct {
	WinPlayers int         `json:"winPlayers"`
	WinPoint   WinLoseCond `json:"winPoint"`
	LosePoint  WinLoseCond `json:"losePoint"`
	LoseBatsu  WinLoseCond `json:"loseBatsu"`
}

type WinLoseCond struct {
	Active bool `json:"active"`
	Value  int  `json:"value"`
	Above  bool `json:"above"`
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
	rule.PointWrong = 0
	rule.BatsuWrong = 1
	rule.LockWrong = 0
	rule.WinPlayers = 0
	rule.WinPoint = WinLoseCond{true, 7, true}
	rule.LosePoint = WinLoseCond{false, 0, false}
	rule.LoseBatsu = WinLoseCond{true, 3, true}
	rule.SpecialCorrect = NewSpecialCorrectRule()
	rule.SpecialWrong = NewSpecialWrongRule()
	rule.Comprehensive = NewComprehensiveRule()
	return rule
}

func NewSpecialCorrectRule() *SpecialCorrectRule {
	rule := new(SpecialCorrectRule)
	rule.ConsBonus = false
	rule.Survival = ActiveAndValue{false, -1}
	return rule
}

func NewSpecialWrongRule() *SpecialWrongRule {
	rule := new(SpecialWrongRule)
	rule.Updown = false
	rule.Swedish = false
	rule.Divide = false
	return rule
}

func NewComprehensiveRule() *ComprehensiveRule {
	rule := new(ComprehensiveRule)
	rule.Active = false
	rule.Calc = "mul"
	rule.WinPoint = WinLoseCond{true, 100, true}
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
	rule.WinPoint = WinLoseCond{true, 7, true}
	rule.LosePoint = WinLoseCond{false, 0, false}
	rule.LoseBatsu = WinLoseCond{true, 3, true}
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
	rule.PassQuiz = false
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

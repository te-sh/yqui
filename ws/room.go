package main

import (
	"math/rand"
)

type Room struct {
	Attendees *Attendees
	Scores map[int64]*Score
	Buttons *Buttons
	Rule *Rule
	History *History
}

func NewRoom() *Room {
	room := new(Room)
	room.Attendees = NewAttendees()
	room.Scores = make(map[int64]*Score)
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}

type Attendees struct {
	Users map[int64]*User `json:"users"`
	Players []int64 `json:"players"`
	Master int64 `json:"master"`
}

func NewAttendees() *Attendees {
	attendees := new(Attendees)
	attendees.Users = make(map[int64]*User)
	attendees.Master = -1
	return attendees
}

type User struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
}

func NewUser(name string) *User {
	user := new(User)
	user.ID = rand.Int63n(int64(1)<<53)
	user.Name = name
	return user
}

type Score struct {
	Point int `json:"point"`
	Batsu int `json:"batsu"`
	Lock int `json:"lock"`
	Win int `json:"win"`
	Lose int `json:"lose"`
}

func NewScore() *Score {
	score := new(Score)
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Win = -1
	score.Lose = -1
	return score
}

type Buttons struct {
	Pushers []int64 `json:"pushers"`
	PushTimes []int64 `json:"pushTimes"`
	Right int `json:"right"`
}

func NewButtons() *Buttons {
	buttons := new(Buttons)
	buttons.Right = -1
	return buttons
}

type Rule struct {
	RightNum int `json:"rightNum"`
	PointCorrect int `json:"pointCorrect"`
	PointWrong int `json:"pointWrong"`
	BatsuWrong int `json:"batsuWrong"`
	LockWrong int `json:"lockWrong"`
	WinPoint ActiveAndValue `json:"winPoint"`
	LosePoint ActiveAndValue `json:"losePoint"`
	LoseBatsu ActiveAndValue `json:"loseBatsu"`
}

type ActiveAndValue struct {
	Active bool `json:"active"`
	Value int `json:"value"`
}

func NewRule() *Rule {
	rule := new(Rule)
	rule.RightNum = 1
	rule.PointCorrect = 1
	rule.PointWrong = 0
	rule.BatsuWrong = 1
	rule.LockWrong = 0
	rule.WinPoint = ActiveAndValue{true, 7}
	rule.LosePoint = ActiveAndValue{false, 0}
	rule.LoseBatsu = ActiveAndValue{true, 3}
	return rule
}

type History struct {
	Buffer []map[int64]*Score
	Curr int
}

const HistoryMaxLen = 100

func NewHistory() *History {
	history := new(History)
	history.Buffer = append(history.Buffer, make(map[int64]*Score))
	history.Curr = 0
	return history
}

package main

import (
	"math/rand"
)

type Room struct {
	Users map[int64]*User
	Attendees *Attendees
	Scores map[int64]*Score
	WinNum int
	LoseNum int
	Buttons *Buttons
	Rule *Rule
	History *History
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(map[int64]*User)
	room.Attendees = NewAttendees()
	room.Scores = make(map[int64]*Score)
	room.WinNum = 0
	room.LoseNum = 0
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}

type Attendees struct {
	Players []int64 `json:"players"`
	Master int64 `json:"master"`
}

func NewAttendees() *Attendees {
	attendees := new(Attendees)
	attendees.Master = -1
	return attendees
}

type User struct {
	ID int64 `json:"id"`
	Conn *Conn `json:"-"`
	Name string `json:"name"`
}

func NewUser(conn *Conn, name string) *User {
	user := new(User)
	user.ID = rand.Int63n(int64(1)<<53)
	user.Conn = conn
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
	score.Win = 0
	score.Lose = 0
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
	ShowPoint bool `json:"showPoint"`
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
	rule.ShowPoint = true
	return rule
}

type History struct {
	Items []*HistoryItem
	Curr int
}

type HistoryItem struct {
	Scores map[int64]*Score
	WinNum int
	LoseNum int
}

const HistoryMaxLen = 100

func NewHistory() *History {
	history := new(History)
	history.Items = append(history.Items, NewHistoryItem())
	history.Curr = 0
	return history
}

func NewHistoryItem() *HistoryItem {
	item := new(HistoryItem)
	item.Scores = make(map[int64]*Score)
	item.WinNum = 0
	item.LoseNum = 0
	return item
}
package main

import (
	"math/rand"
)

type Room struct {
	Users map[int64]*User
	UserIDs []int64
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

type Chat struct {
	Type string `json:"type"`
	Time int64 `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

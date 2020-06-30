package main

type Room struct {
	Users Users
	Teams Teams
	Master int64
	Boards Boards
	BoardLock bool
	Scores Scores
	TeamScores Scores
	WinLose *WinLose
	Buttons *Buttons
	Rule *Rule
	History *History
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(Users)
	room.Master = -1
	room.Boards = make(Boards)
	room.BoardLock = false
	room.Scores = make(Scores)
	room.TeamScores = make(Scores)
	room.WinLose = NewWinLose()
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}

type Chat struct {
	Type string `json:"type"`
	Time int64 `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

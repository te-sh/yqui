package main

type Room struct {
	Users Users
	Teams Teams
	Master int64
	Boards Boards
	BoardLock bool
	SG *ScoreGroup
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
	room.SG = NewScoreGroup()
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}
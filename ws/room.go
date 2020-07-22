package main

type Room struct {
	Users     Users       `json:"users"`
	Teams     Teams       `json:"teams"`
	Boards    Boards      `json:"boards"`
	BoardLock bool        `json:"boardLock"`
	SG        *ScoreGroup `json:"sg"`
	Buttons   *Buttons    `json:"buttons"`
	Rule      *Rule       `json:"rule"`
	History   *History    `json:"-"`
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(Users)
	room.Boards = NewBoards()
	room.BoardLock = false
	room.SG = NewScoreGroup()
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}

func (room *Room) Clone() *Room {
	newRoom := *room
	newRoom.SG = room.SG.Clone()
	newRoom.Boards = room.Boards.Clone()
	return &newRoom
}

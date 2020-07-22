package main

type Room struct {
	Users     Users       `json:"users"`
	Teams     Teams       `json:"teams"`
	BG        *BoardGroup `json:"bg"`
	SG        *ScoreGroup `json:"sg"`
	Buttons   *Buttons    `json:"buttons"`
	Rule      *Rule       `json:"rule"`
	History   *History    `json:"-"`
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(Users)
	room.BG = NewBoardGroup()
	room.SG = NewScoreGroup()
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}

func (room *Room) Clone() *Room {
	newRoom := *room
	newRoom.SG = room.SG.Clone()
	newRoom.BG = room.BG.Clone()
	return &newRoom
}

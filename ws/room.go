package main

type Room struct {
	Users   Users       `json:"users"`
	Teams   Teams       `json:"teams"`
	BG      *BoardGroup `json:"bg,omitempty"`
	SG      *ScoreGroup `json:"sg"`
	Buttons *Buttons    `json:"buttons"`
	Rule    *Rule       `json:"rule"`
	History *History    `json:"-"`
	Timer   *Timer      `json:"-"`
}

func NewRoom() *Room {
	room := new(Room)
	team := NewTeam()

	room.Users = make(Users)
	room.Teams = Teams{team}
	room.BG = NewBoardGroup()
	room.SG = NewScoreGroup()
	room.SG.Team.Add(team.ID)
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	room.Timer = NewTimer(room)

	return room
}

func (room *Room) Clone() *Room {
	newRoom := *room
	newRoom.SG = room.SG.Clone()
	newRoom.BG = room.BG.Clone()
	return &newRoom
}

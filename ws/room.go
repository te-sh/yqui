package main

const numRooms = 16
var rooms = NewRooms()

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

type Rooms []*Room

type RoomSummary struct {
	NumUsers int `json:"numUsers"`
}

type RoomsSummary []*RoomSummary

func NewRooms() Rooms {
	var rooms Rooms
	for i := 0; i < numRooms; i++ {
		rooms = append(rooms, NewRoom())
	}
	return rooms
}

func NewRoomSummary(room *Room) *RoomSummary {
	roomSummary := new(RoomSummary)
	roomSummary.NumUsers = len(room.Users)
	return roomSummary
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
	room.Timer = nil

	return room
}

func (room *Room) Clone() *Room {
	newRoom := *room
	newRoom.SG = room.SG.Clone()
	newRoom.BG = room.BG.Clone()
	return &newRoom
}

func (rooms Rooms) MakeSummary() RoomsSummary {
	var roomsSummary RoomsSummary
	for _, room := range rooms {
		roomsSummary = append(roomsSummary, NewRoomSummary(room))
	}
	return roomsSummary
}

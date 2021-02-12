package main

const numRooms = 16

var rooms = NewRooms()

type Room struct {
	Users   Users       `json:"users"`
	Teams   Teams       `json:"teams"`
	BG      *BoardGroup `json:"-"`
	SG      *ScoreGroup `json:"-"`
	Buttons *Buttons    `json:"buttons"`
	Rule    *Rule       `json:"-"`
	History *History    `json:"-"`
	Timer   *Timer      `json:"-"`
	AESKey  []byte      `json:"-"`
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
	room.AESKey = make([]byte, 32)
	room.RenewAESKey()

	return room
}

func (room *Room) RenewAESKey() {
	RandomBytes(room.AESKey)
}

func (rooms Rooms) GetRoom(roomNo int) (*Room, bool) {
	if 0 <= roomNo && roomNo < len(rooms) {
		return rooms[roomNo], true
	} else {
		return nil, false
	}
}

func (rooms Rooms) MakeSummary() RoomsSummary {
	var roomsSummary RoomsSummary
	for _, room := range rooms {
		roomsSummary = append(roomsSummary, NewRoomSummary(room))
	}
	return roomsSummary
}

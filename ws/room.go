package main

const numRooms = 16

var rooms = NewRooms()

type RoomSummary struct {
	NumUsers    int    `json:"numUsers"`
	Title       string `json:"title"`
	HasPassword bool   `json:"hasPassword"`
}

type RoomsSummary []*RoomSummary

type Room struct {
	Tag     *RoomTag    `json:"tag"`
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

type RoomTag struct {
	Title    string `json:"title"`
	Password string `json:"password"`
}

type Rooms []*Room

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
	roomSummary.Title = room.Tag.Title
	roomSummary.HasPassword = len(room.Tag.Password) > 0
	return roomSummary
}

func NewRoom() *Room {
	room := new(Room)
	team := NewTeam()

	room.Tag = NewTag()
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

func NewTag() *RoomTag {
	tag := new(RoomTag)
	tag.Title = ""
	tag.Password = ""
	return tag
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

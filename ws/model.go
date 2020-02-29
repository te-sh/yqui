package main

type Cmd struct {
	C string `json:"c"`
	A string `json:"a"`
	ID int64 `json:"-"`
	Time int64 `json:"-"`
}

type Message struct {
	Type string `json:"type"`
	Content interface {} `json:"content"`
}

type User struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	Correct int32 `json:"correct"`
	Wrong int32 `json:"wrong"`
}

type Room struct {
	Users map[int64]*User `json:"users"`
	Players []int64 `json:"players"`
	Master int64 `json:"master"`
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(map[int64]*User)
	room.Master = -1
	return room
}

type Chat struct {
	Name string `json:"name"`
	Text string `json:"text"`
	Time int64 `json:"time"`
}

type Answer struct {
	ID int64 `json:"id"`
	Time int64 `json:"time"`
}

package main

type Cmd struct {
	C string `json:"c"`
	A string `json:"a"`
	ID int64
}

type Message struct {
	Type string `json:"type"`
	Content interface {} `json:"content"`
}

type User struct {
	Name string `json:"name"`
}

type Room struct {
	Users map[int64]User `json:"users"`
	Players []int64 `json:"players"`
	Master int64 `json:"master"`
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(map[int64]User)
	room.Master = -1
	return room
}

type Chat struct {
	Name string `json:"name"`
	Text string `json:"text"`
	Time int64 `json:"time"`
}

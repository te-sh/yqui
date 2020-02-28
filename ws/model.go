package main

type Cmd struct {
	C string `json:"c"`
	A string `json:"a"`
	ID int64
}

type User struct {
	Name string `json:"name"`
}

type Room struct {
	IDs []int64
	Users map[int64]User
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(map[int64]User)
	return room
}

type Message struct {
	Type string `json:"type"`
	Content interface {} `json:"content"`
}

type Chat struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

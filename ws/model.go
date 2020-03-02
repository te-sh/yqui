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
	Correct int `json:"correct"`
	Wrong int `json:"wrong"`
	WinOrder int `json:"winOrder"`
	LoseOrder int `json:"loseOrder"`
}

func NewUser(id int64, name string) *User {
	user := new(User)
	user.ID = id
	user.Name = name
	user.WinOrder = -1
	user.LoseOrder = -1
	return user
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

func Win(room *Room, target *User) {
	r := 0
	for id := range room.Users {
		if room.Users[id].WinOrder >= 0 {
			r += 1
		}
	}
	target.WinOrder = r
}

func Lose(room *Room, target *User) {
	r := 0
	for id := range room.Users {
		if room.Users[id].LoseOrder >= 0 {
			r += 1
		}
	}
	target.LoseOrder = r
}

type Rule struct {
	CorrectByCorrect int `json:"correctByCorrect"`
	WrongByWrong int `json:"wrongByWrong"`
	WinCorrect int `json:"winCorrect"`
	LoseWrong int `json:"loseWrong"`
}

func NewRule() *Rule {
	rule := new(Rule)
	rule.CorrectByCorrect = 1
	rule.WrongByWrong = 1
	rule.WinCorrect = 7
	rule.LoseWrong = 3
	return rule
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

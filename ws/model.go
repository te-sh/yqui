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

type History struct {
	Buffer []map[int64]*User
	Curr int
}

const historyMaxLen = 100

func NewHistory() *History {
	history := new(History)
	history.Buffer = append(history.Buffer, make(map[int64]*User))
	history.Curr = 0
	return history
}

func AddHistoryUser(history *History, user *User) {
	item := *user
	history.Buffer[history.Curr][user.ID] = &item
}

func AddHistory(history *History, room *Room) {
	history.Buffer = history.Buffer[:history.Curr + 1]
	item := make(map[int64]*User)
	for id := range room.Users {
		user := *room.Users[id]
		item[id] = &user
	}
	history.Buffer = append(history.Buffer, item)
	if len(history.Buffer) > historyMaxLen {
		history.Curr -= len(history.Buffer) - historyMaxLen
		history.Buffer = history.Buffer[len(history.Buffer) - historyMaxLen:]
	}
	history.Curr += 1
}

func MoveHistory(history *History, room *Room, d int) {
	i := history.Curr + d
	if i < 0 || i >= len(history.Buffer) {
		return
	}

	users := history.Buffer[i]
	for id := range users {
		if _, ok := room.Users[id]; ok {
			user := *users[id]
			room.Users[id] = &user
		}
	}
	history.Curr = i
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

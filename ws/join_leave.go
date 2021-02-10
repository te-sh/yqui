package main

import "encoding/json"

type Join struct {
	RoomNo      int    `json:"roomNo"`
	Name        string `json:"name"`
	Observer    bool   `json:"observer"`
	ChatAnswer  bool   `json:"chatAnswer"`
	BorderColor string `json:"borderColor"`
}

func MakeJoin(cmd Cmd) *Join {
	join := new(Join)
	json.Unmarshal(cmd.A, join)
	return join
}

func JoinUser(conn *Conn, cmd Cmd) {
	LogInfo("joining user", Log{Conn: conn})

	join := MakeJoin(cmd)
	if join.RoomNo < 0 || join.RoomNo >= len(rooms) {
		LogError("join user", Log{Conn: conn, Message: "roon No is invalid"})
		return
	}

	room := rooms[join.RoomNo]
	if room == nil {
		LogError("join user", Log{Conn: conn, Message: "room does not exist"})
		return
	}

	mapper.RegisterRoom(conn.ID, room)
	room.JoinUser(conn.ID, join, NowMilliSec())
	room.SendRoom()
	SendToOne(conn.ID, "joined", join.RoomNo, true)
	SendToAll("rooms", rooms.MakeSummary(), true)
	LogInfo("joined user", Log{Conn: conn})
}

func LeaveUser(conn *Conn) {
	LogInfo("leaving user", Log{Conn: conn})
	if room, ok := mapper.GetRoom(conn.ID); ok {
		mapper.UnregisterRoom(conn.ID)
		room.LeaveUser(conn.ID, NowMilliSec())
		room.SendRoom()
		SendToAll("rooms", rooms.MakeSummary(), true)
		LogInfo("left user", Log{Conn: conn})
	}
}

func (room *Room) JoinUser(id int64, join *Join, time int64) {
	if _, ok := room.Users[id]; ok {
		LogError("join user", Log{Message: "duplicated id", Json: join})
		return
	}

	user := NewUser(id, join.Name)
	user.ChatAnswer = join.ChatAnswer
	user.BorderColor = join.BorderColor
	room.Users[id] = user
	if !join.Observer {
		room.Teams.AddPlayer(user)
	}
	room.BG.Boards.Add(id)
	room.SG.Player.Add(id)
	room.SG.Player.Scores[id].Init(room.Rule.Player)

	room.History.Join(id)

	chat := Chat{Type: "join", Time: time, Name: join.Name}
	room.SendChat(chat)
}

func (room *Room) LeaveUser(id int64, time int64) {
	user := room.Users[id]

	room.SG.Player.Remove(id)
	room.BG.Boards.Remove(id)
	room.Teams.RemovePlayer(user)
	delete(room.Users, id)

	room.Buttons.Remove(id)
	if room.NoCanAnswer() {
		room.NextQuiz()
	}

	room.History.Leave(id)

	if len(room.Users) == 0 {
		room.TruncateTeams()
		room.Rule = NewRule()
		room.SG.Reset()
	}

	chat := Chat{Type: "leave", Time: time, Name: user.Name}
	room.SendChat(chat)
}

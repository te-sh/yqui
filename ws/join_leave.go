package main

import "encoding/json"

type Join struct {
	RoomNo      int    `json:"roomNo"`
	Name        string `json:"name"`
	Observer    bool   `json:"observer"`
	ChatAnswer  bool   `json:"chatAnswer"`
	BorderColor string `json:"borderColor"`
	ScoreBackup string `json:"scoreBackup"`
}

func MakeJoin(cmd Cmd) *Join {
	join := new(Join)
	json.Unmarshal(cmd.A, join)
	return join
}

func (room *Room) JoinUser(id int64, join *Join) (*User, bool) {
	if _, ok := room.Users[id]; ok {
		LogError("join user", Log{ID: id, Message: "duplicated id", Json: join})
		return nil, false
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
	if len(join.ScoreBackup) > 0 {
		if score, err := room.RestoreScoreBackup(user, join.ScoreBackup); err == nil {
			room.SG.Player.Scores[id] = score
		}
	}

	room.History.Join(id)

	mapper.RegisterRoom(id, room)

	return user, true
}

func (room *Room) LeaveUser(id int64) (*User, bool) {
	if _, ok := room.Users[id]; !ok {
		LogError("leave user", Log{ID: id, Message: "user is not found"})
		return nil, false
	}
	user := room.Users[id]
	retUser := user.Clone()

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
		room.RenewAESKey()
	}

	mapper.UnregisterRoom(id)

	return retUser, true
}

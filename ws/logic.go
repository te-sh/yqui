package main

import (
	"errors"
)

func (room *Room) JoinUser(conn *Conn, name string, time int64) int64 {
	user := NewUser(conn, name)
	id := user.ID

	room.Users[id] = user
	room.UserIDs = append(room.UserIDs, id)
	room.Attendees.JoinUser(id)
	room.Scores[id] = NewScore()
	room.History.Items[room.History.Curr].Scores[id] = NewScore()

	room.SendToOne(id, "selfID", id)
	room.SendToOne(id, "rule", room.Rule)

	room.SendRoom()
	chat := Chat{Type: "join", Time: time, Name: name}
	room.Broadcast("chat", chat)

	return id
}

func (room *Room) LeaveUser(id int64, time int64) {
	name := room.Users[id].Name

	delete(room.Users, id)
	room.UserIDs = Int64Remove(room.UserIDs, id)
	room.Attendees.LeaveUser(id)
	delete(room.Scores, id)

	room.SendRoom()
	chat := Chat{Type: "leave", Time: time, Name: name}
	room.Broadcast("chat", chat)
}

func (room *Room) UpdateUser(user *User) {
	if curr, ok := room.Users[user.ID]; ok {
		curr.ChatAnswer = user.ChatAnswer
		room.SendUsers()
	}
}

func (room *Room) ChangeAttendees() {
	room.Attendees.RemoveInvalid(room.UserIDs)
	room.SendAttendees()
}

func (room *Room) ToggleMaster(id int64) {
	room.Attendees.ToggleMaster(id)
	room.SendAttendees()
}

func (room *Room) PushButton(id int64, time int64) (ring bool) {
	team, err := room.Attendees.Team(id)
	if err != nil {
		return
	}
	if !Int64Any(team, room.Buttons.Pushed) && room.Scores[team[0]].CanPush() {
		ring = room.Buttons.AllAnswered()
		room.Buttons.Push(id, time)
		room.SendButtons()
	}
	return
}

func (room *Room) TargetScore(team []int64) (*Score, []*Score, error) {
	score, ok := room.Scores[team[0]]
	if !ok {
		return nil, nil, errors.New("Not a player")
	}
	otherTeams, err := room.Attendees.OtherTeams(team[0])
	if err != nil {
		return nil, nil, errors.New("Not a player")
	}
	var otherScores []*Score
	for _, otherTeam := range otherTeams {
		if team[0] != otherTeam[0] {
			otherScores = append(otherScores, room.Scores[otherTeam[0]])
		}
	}
	return score, otherScores, nil
}

func (room *Room) Correct() (win bool) {
	buttons := room.Buttons
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}
	team, err := room.Attendees.Team(id)
	if err != nil {
		return
	}

	rule := room.Rule
	score, otherScores, err := room.TargetScore(team)
	if err != nil {
		return
	}
	win = score.Correct(rule, &room.WinNum, otherScores)

	room.NextQuiz(true)
	room.AddHistory()

	return
}

func (room *Room) NumCanAnswer() int {
	r := 0
	if (room.Attendees.TeamGame) {
		for _, team := range room.Attendees.Teams {
			if !Int64Any(team, room.Buttons.Answered) && room.Scores[team[0]].CanPush() {
				r += 1
			}
		}
	} else {
		for _, id := range room.Attendees.Players {
			if !room.Buttons.Answered(id) && room.Scores[id].CanPush() {
				r += 1
			}
		}
	}
	return r
}

func (room *Room) Wrong() (lose bool) {
	buttons := room.Buttons
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}
	team, err := room.Attendees.Team(id)
	if err != nil {
		return
	}

	rule := room.Rule
	score, otherScores, err := room.TargetScore(team)
	if err != nil {
		return
	}
	lose = score.Wrong(rule, &room.LoseNum, otherScores)

	buttons.Answerers = append(buttons.Answerers, id)
	if len(buttons.Answerers) >= rule.RightNum || room.NumCanAnswer() == 0 {
		room.NextQuiz(false)
	}
	room.SendButtons()
	room.SendScores()
	room.AddHistory()

	return
}

func (room *Room) NextQuiz(send bool) {
	for id := range room.Scores {
		score := room.Scores[id]
		if !room.Buttons.Answered(id) && score.Lock > 0 {
			score.Lock -= 1
		}
	}
	room.ResetButtons(send)
	if send {
		room.SendScores()
	}
}

func (room *Room) ResetButtons(send bool) {
	room.Buttons.Reset()
	if send {
		room.SendButtons()
	}
}

func (room *Room) AllClear() {
	room.ResetButtons(true)
	for id := range room.Scores {
		room.Scores[id].Reset()
	}
	room.WinNum = 0
	room.LoseNum = 0
	room.AddHistory()
	room.SendScores()
}

func (room *Room) AddHistory() {
	history := room.History
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	for id := range room.Scores {
		item.Scores[id] = room.Scores[id].Clone()
	}
	item.WinNum = room.WinNum
	item.LoseNum = room.LoseNum

	history.Items = append(history.Items, item)
	history.Curr += 1

	if len(history.Items) > HistoryMaxLen {
		history.Curr -= len(history.Items) - HistoryMaxLen
		history.Items = history.Items[len(history.Items) - HistoryMaxLen:]
	}
}

func (room *Room) MoveHistory(d int) {
	history := room.History
	i := history.Curr + d
	if i < 0 || i >= len(history.Items) {
		return
	}

	item := history.Items[i]
	for id := range item.Scores {
		if _, ok := room.Scores[id]; ok {
			room.Scores[id] = item.Scores[id].Clone()
		}
	}
	room.WinNum = item.WinNum
	room.LoseNum = item.LoseNum

	history.Curr = i
	room.SendScores()
}

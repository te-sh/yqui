package main

func (room *Room) JoinUser(conn *Conn, name string, time int64) int64 {
	user := NewUser(conn, name)
	id := user.ID

	room.Users[id] = user
	room.UserIDs = append(room.UserIDs, id)
	room.AddPlayerToDefaultTeam(id)
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
	user := room.Users[id]

	delete(room.Scores, id)
	if (room.Master == id) {
		room.Master = -1
	}
	room.RemovePlayerFromTeam(id)
	room.UserIDs = Int64Remove(room.UserIDs, id)
	delete(room.Users, id)

	room.SendRoom()
	chat := Chat{Type: "leave", Time: time, Name: user.Name}
	room.Broadcast("chat", chat)
}

func (room *Room) AddPlayerToDefaultTeam(id int64) {
	if len(room.Teams) == 0 {
		team := NewTeam()
		team.ID = NewID()
		room.Teams = append(room.Teams, team)
		room.TeamScores[team.ID] = NewScore()
	}
	if len(room.Teams) == 1 {
		room.Teams[0].AddPlayer(id)
		room.Users[id].Team = room.Teams[0]
	}
}

func (room *Room) RemovePlayerFromTeam(id int64) {
	user := room.Users[id]
	if user.Team != nil {
		user.Team.RemovePlayer(id)
		if len(user.Team.Players) == 0 {
			room.Teams = room.Teams.Removed(user.Team)
			delete(room.TeamScores, user.Team.ID)
		}
	}
}

func (room *Room) UpdateUser(user *User) {
	target := room.Users[user.ID]
	target.ChatAnswer = user.ChatAnswer
	room.SendUsers()
}

func (room *Room) ChangeTeams() {
	for _, user := range room.Users {
		user.Team = nil
	}
	newTeamScores := make(Scores)
	for _, team := range room.Teams {
		if team.ID < 0 {
			team.ID = NewID()
		}
		for _, id := range team.Players {
			room.Users[id].Team = team
			if room.Master == id {
				room.Master = -1
			}
		}
		if teamScore, ok := room.TeamScores[team.ID]; ok {
			newTeamScores[team.ID] = teamScore
		} else {
			newTeamScores[team.ID] = NewScore()
		}
	}
	room.TeamScores = newTeamScores
	room.SendTeams()
}

func (room *Room) ToggleMaster(id int64) {
	if room.Master == id {
		room.Master = -1
		room.AddPlayerToDefaultTeam(id)
	} else if room.Master == -1 {
		room.Master = id
		room.RemovePlayerFromTeam(id)
	}
	room.SendTeams()
}

func (room *Room) Pushed(user *User) bool {
	if room.Rule.ShareButton {
		return Int64Any(user.Team.Players, room.Buttons.Pushed)
	} else {
		return room.Buttons.Pushed(user.ID)
	}
}

func (room *Room) PushButton(id int64, time int64) (ring bool) {
	user := room.Users[id]
	if !room.Pushed(user) && room.Scores[id].CanPush() && room.TeamScores[user.Team.ID].CanPush() {
		ring = room.Buttons.AllAnswered()
		room.Buttons.Push(id, time)
		room.SendButtons()
	}
	return
}

func (room *Room) Correct() (win bool) {
	buttons := room.Buttons
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}

	rule := room.Rule
	win = room.Scores.Correct(id, rule, room.WinLose)

	room.NextQuiz(true)
	room.AddHistory()

	return
}

func (room *Room) NumCanAnswer() int {
	r := 0
	for _, team := range room.Teams {
		if !room.TeamScores[team.ID].CanPush() {
			continue
		}
		if room.Rule.ShareButton {
			if Int64Any(team.Players, func (id int64) bool {
				return !room.Buttons.Answered(id) && room.Scores[id].CanPush()
			}) {
				r += 1
			}
		} else {
			for _, id := range team.Players {
				if !room.Buttons.Answered(id) && room.Scores[id].CanPush() {
					r += 1
				}
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

	rule := room.Rule
	lose = room.Scores.Wrong(id, rule, room.WinLose)

	buttons.Answer(id)
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
	for _, score := range room.Scores {
		score.Reset()
	}
	for _, teamScore := range room.TeamScores {
		teamScore.Reset()
	}
	room.WinLose.Reset()
	room.AddHistory()
	room.SendScores()
}

func (room *Room) AddHistory() {
	history := room.History
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	item.Scores = room.Scores.Clone()
	item.TeamScores = room.TeamScores.Clone()
	item.WinLose = room.WinLose.Clone()

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
	for id := range item.TeamScores {
		if _, ok := room.TeamScores[id]; ok {
			room.TeamScores[id] = item.TeamScores[id].Clone()
		}
	}
	room.WinLose = item.WinLose.Clone()

	history.Curr = i
	room.SendScores()
}

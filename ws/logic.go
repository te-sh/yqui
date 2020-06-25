package main

func (room *Room) JoinUser(id int64, conn *Conn, name string, time int64) {
	user := NewUser(id, conn, name)

	room.Users[id] = user
	room.UserIDs = append(room.UserIDs, id)
	room.AddPlayerToDefaultTeam(id)
	room.Boards[id] = NewBoard(id)
	room.Scores[id] = NewScore()
	room.History.Items[room.History.Curr].Scores[id] = NewScore()

	room.SendToOne(id, "selfID", id)
	room.SendToOne(id, "rule", room.Rule)

	room.SendBoards()
	room.SendBoardLock()
	room.SendRoom()
	chat := Chat{Type: "join", Time: time, Name: name}
	room.Broadcast("chat", chat)
}

func (room *Room) LeaveUser(id int64, time int64) {
	user := room.Users[id]

	delete(room.Scores, id)
	delete(room.Boards, id)
	if (room.Master == id) {
		room.Master = -1
	}
	room.RemovePlayerFromTeam(id)
	room.UserIDs = Int64Remove(room.UserIDs, id)
	delete(room.Users, id)

	room.Buttons.Leave(id)
	if room.NoCanAnswer() {
		room.NextQuiz()
	}

	if len(room.UserIDs) == 0 {
		room.Rule = NewRule()
		room.WinLose = NewWinLose()
	}

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
	if room.Rule.TeamShareButton {
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
	teamWin, _ := room.TeamScores.CalcTeam(room.Teams, room.Scores, rule, room.WinLose)
	win = win || teamWin

	room.NextQuiz()
	room.AddHistory()

	return
}

func (room *Room) NumCanAnswer() int {
	r := 0
	for _, team := range room.Teams {
		if !room.TeamScores[team.ID].CanPush() {
			continue
		}
		if room.Rule.TeamShareButton {
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

func (room *Room) NoCanAnswer() bool {
	return len(room.Buttons.Answerers) >= room.Rule.RightNum || room.NumCanAnswer() == 0
}

func (room *Room) Wrong() (lose bool) {
	buttons := room.Buttons
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}

	rule := room.Rule
	lose = room.Scores.Wrong(id, rule, room.WinLose)
	_, teamLose := room.TeamScores.CalcTeam(room.Teams, room.Scores, rule, room.WinLose)
	lose = lose || teamLose

	buttons.Answer(id)
	if room.NoCanAnswer() {
		room.NextQuiz()
	} else {
		room.SendButtons()
	}
	room.AddHistory()

	return
}

func (room *Room) NextQuiz() {
	for id := range room.Scores {
		score := room.Scores[id]
		if !room.Buttons.Answered(id) && score.Lock > 0 {
			score.Lock -= 1
		}
	}
	room.TeamScores.CalcTeam(room.Teams, room.Scores, room.Rule, room.WinLose)
	room.ResetButtons()
}

func (room *Room) ResetButtons() {
	room.Buttons.Reset()
	room.SendButtons()
}

func (room *Room) ResetBoards() {
	for id, _ := range room.Boards {
		room.Boards[id] = NewBoard(id)
	}
	room.BoardLock = false
	room.SendBoards()
	room.SendBoardLock()
}

func (room *Room) UpdateBoards(newBoards Boards) (open bool, correct bool, win bool, wrong bool, lose bool) {
	first, _ := room.Buttons.RightPlayer()
	open = room.Boards.Opens(newBoards)

	if corrects := room.Boards.Corrects(newBoards); len(corrects) > 0 {
		correct, win = room.Scores.CorrectBoard(corrects, first, room.Rule, room.WinLose)
	}
	if wrongs := room.Boards.Wrongs(newBoards); len(wrongs) > 0 {
		wrong, lose = room.Scores.WrongBoard(wrongs, first, room.Rule, room.WinLose)
	}
	room.TeamScores.CalcTeam(room.Teams, room.Scores, room.Rule, room.WinLose)

	if correct || wrong {
		room.AddHistory()
	}

	room.SendScores()
	room.Boards = newBoards
	room.SendBoards()
	return
}

func (room *Room) UpdateBoard(newBoard *Board) (open bool, correct bool, win bool, wrong bool, lose bool) {
	first, _ := room.Buttons.RightPlayer()
	open = room.Boards.Open(newBoard)

	id := newBoard.ID
	if room.Boards.Correct(newBoard) {
		correct, win = room.Scores.CorrectBoard([]int64{id}, first, room.Rule, room.WinLose)
	}
	if room.Boards.Wrong(newBoard) {
		wrong, lose = room.Scores.WrongBoard([]int64{id}, first, room.Rule, room.WinLose)
	}
	teamWin, teamLose := room.TeamScores.CalcTeam(room.Teams, room.Scores, room.Rule, room.WinLose)
	win = win || teamWin
	lose = lose || teamLose

	if correct || wrong {
		room.AddHistory()
	}

	room.SendScores()
	room.Boards[id] = newBoard
	room.SendBoard(id)
	return
}

func (room *Room) AllClear() {
	room.ResetButtons()
	for _, score := range room.Scores {
		score.Reset()
	}
	for _, teamScore := range room.TeamScores {
		teamScore.Reset()
	}
	room.WinLose.Reset()
	room.AddHistory()
}

func (room *Room) AddHistory() {
	room.History.AddHistory(room.Scores, room.TeamScores, room.WinLose)
	room.SendScores()
}

func (room *Room) MoveHistory(d int) {
	room.History.MoveHistory(d, room.Scores, room.TeamScores, room.WinLose)
	room.SendScores()
}

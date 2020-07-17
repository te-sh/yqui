package main

func (room *Room) JoinUser(id int64, conn *Conn, name string, time int64) {
	if _, ok := room.Users[id]; ok {
		return
	}

	user := NewUser(id, conn, name)

	room.Users[id] = user
	room.AddPlayerToDefaultTeam(id)
	room.Boards[id] = NewBoard(id)
	room.SG.Player.Add(id)

	room.SendSelfID(id)
	room.SendBoards()
	room.SendBoardLock()
	room.SendRoom()
	chat := Chat{Type: "join", Time: time, Name: name}
	room.SendChat(chat)
}

func (room *Room) LeaveUser(id int64, time int64) {
	user := room.Users[id]

	room.SG.Player.Remove(id)
	delete(room.Boards, id)
	if (room.Master == id) {
		room.Master = -1
	}
	room.RemovePlayerFromTeam(id)
	delete(room.Users, id)

	room.Buttons.Leave(id)
	if room.NoCanAnswer() {
		room.NextQuiz()
	}

	if len(room.Users) == 0 {
		room.Rule = NewRule()
		room.SG = NewScoreGroup()
	}

	room.SendRoom()
	chat := Chat{Type: "leave", Time: time, Name: user.Name}
	room.SendChat(chat)
}

func (room *Room) AddPlayerToDefaultTeam(id int64) {
	if len(room.Teams) == 0 {
		team := NewTeam()
		team.ID = NewID()
		room.Teams = append(room.Teams, team)
		room.SG.Team.Add(team.ID)
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
			room.SG.Team.Remove(user.Team.ID)
		}
	}
}

func (room *Room) ChangeTeams() {
	for _, user := range room.Users {
		user.Team = nil
	}
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
	}
	room.SG.Team.SetTeam(room.Teams)
	room.SendRoom()
}

func (room *Room) ToggleMaster(id int64) {
	if room.Master == id {
		room.Master = -1
		room.AddPlayerToDefaultTeam(id)
	} else if room.Master == -1 {
		room.Master = id
		room.RemovePlayerFromTeam(id)
	}
	room.SendRoom()
}

func (room *Room) Pushed(user *User) bool {
	if room.Rule.Team.Active && room.Rule.Team.ShareButton {
		return Int64Any(user.Team.Players, room.Buttons.Pushed)
	} else {
		return room.Buttons.Pushed(user.ID)
	}
}

func (room *Room) PushButton(id int64, time int64, sound *Sound) {
	user := room.Users[id]
	if !room.Pushed(user) && room.SG.Player.CanPush(id) &&
		(!room.Rule.Team.Active || room.SG.Team.CanPush(user.Team.ID)) {
		sound.Push = room.Buttons.AllAnswered()
		room.Buttons.Push(id, time)
		room.SendButtons()
	}
}

func (room *Room) Correct(sound *Sound) {
	buttons := room.Buttons
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}

	rule := room.Rule
	room.SG.Player.Correct(id, rule, sound)
	room.SG.Team.CalcTeam(room.Teams, room.SG.Player, rule, sound)

	room.NextQuiz()
	room.AddHistory()
}

func (room *Room) NumCanAnswer() int {
	r := 0
	for _, team := range room.Teams {
		if room.Rule.Team.Active && !room.SG.Team.CanPush(team.ID) {
			continue
		}
		if room.Rule.Team.ShareButton {
			if Int64Any(team.Players, func (id int64) bool {
				return !room.Buttons.Answered(id) && room.SG.Player.CanPush(id)
			}) {
				r += 1
			}
		} else {
			for _, id := range team.Players {
				if !room.Buttons.Answered(id) && room.SG.Player.CanPush(id) {
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

func (room *Room) Wrong(sound *Sound) {
	buttons := room.Buttons
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}

	rule := room.Rule
	room.SG.Player.Wrong(id, rule, sound)
	room.SG.Team.CalcTeam(room.Teams, room.SG.Player, rule, sound)

	buttons.Answer(id)
	if room.NoCanAnswer() {
		room.NextQuiz()
	} else {
		room.SendButtons()
	}
	room.AddHistory()
}

func (room *Room) NextQuiz() {
	room.SG.Player.DecreaseLock(room.Buttons)
	room.SG.Team.CalcTeam(room.Teams, room.SG.Player, room.Rule, nil)
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

func (room *Room) UpdateBoards(newBoards Boards, sound *Sound) {
	first, _ := room.Buttons.RightPlayer()
	sound.Open = room.Boards.Opens(newBoards)

	if corrects := room.Boards.Corrects(newBoards); len(corrects) > 0 {
		room.SG.Player.CorrectBoard(corrects, first, room.Rule, sound)
	}
	if wrongs := room.Boards.Wrongs(newBoards); len(wrongs) > 0 {
		room.SG.Player.WrongBoard(wrongs, first, room.Rule, sound)
	}
	room.SG.Team.CalcTeam(room.Teams, room.SG.Player, room.Rule, sound)

	if sound.Correct || sound.Wrong {
		room.AddHistory()
	} else {
		room.SendScores()
	}

	room.Boards = newBoards
	room.SendBoards()
}

func (room *Room) UpdateBoard(newBoard *Board, sound *Sound) {
	first, _ := room.Buttons.RightPlayer()
	sound.Open = room.Boards.Open(newBoard)

	id := newBoard.ID
	if room.Boards.Correct(newBoard) {
		room.SG.Player.CorrectBoard([]int64{id}, first, room.Rule, sound)
	}
	if room.Boards.Wrong(newBoard) {
		room.SG.Player.WrongBoard([]int64{id}, first, room.Rule, sound)
	}
	room.SG.Team.CalcTeam(room.Teams, room.SG.Player, room.Rule, sound)

	if sound.Correct || sound.Wrong {
		room.AddHistory()
	} else {
		room.SendScores()
	}

	room.Boards[id] = newBoard
	room.SendBoard(id)
}

func (room *Room) AllClear() {
	room.ResetButtons()
	room.SG.Reset()
	room.AddHistory()
}

func (room *Room) AddHistory() {
	room.History.Add(room.SG)
	room.SendScores()
}

func (room *Room) MoveHistory(d int) {
	room.History.Move(d, room.SG)
	room.SendScores()
}

package main

func (room *Room) ChangeTeams() {
	for _, user := range room.Users {
		user.Team = nil
	}
	for _, team := range room.Teams {
		if team.ID < 0 {
			team.ID = NewID()
		}
		for _, id := range team.Players {
			if user, ok := room.Users[id]; ok {
				user.Team = team
			}
		}
	}
	room.SG.Team.SetTeams(room.Teams)
}

func (room *Room) ToggleMaster(id int64) (*User, bool) {
	if user, ok := room.Users[id]; ok {
		if user.IsMaster {
			user.IsMaster = false
			room.Teams.AddPlayer(user)
		} else if _, ok := room.Users.MasterID(); !ok {
			user.IsMaster = true
			room.Teams.RemovePlayer(user)
		}
		return user, true
	}
	return nil, false
}

func (room *Room) ToggleObserver(id int64) (*User, bool) {
	if user, ok := room.Users[id]; ok {
		if user.Team == nil {
			room.Teams.AddPlayer(user)
		} else {
			room.Teams.RemovePlayer(user)
		}
		return user, true
	}
	return nil, false
}

func (room *Room) Pushed(user *User) bool {
	if room.Rule.Team.Active && room.Rule.Team.ShareButton {
		return Int64Any(user.Team.Players, room.Buttons.Pushed)
	} else {
		return room.Buttons.Pushed(user.ID)
	}
}

func (room *Room) PushButton(id int64, time int64, sound *Sound) {
	if user, ok := room.Users[id]; ok {
		if !room.Pushed(user) && room.SG.Player.CanPush(id) &&
			(!room.Rule.Team.Active || room.SG.Team.CanPush(user.Team.ID)) {
			sound.Push = room.Buttons.AllAnswered()
			room.Buttons.Push(id, time)
			room.History.NeedSave = true
		}
	}
}

func (room *Room) Correct(judgeArg *JudgeArg, sound *Sound) {
	sg, buttons, rule := room.SG, room.Buttons, room.Rule
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}
	room.History.Save(sg, buttons)

	sg.Player.Correct(id, rule, sound)
	sg.Team.CalcTeams(room.Teams, sg.Player, rule, sound)

	if judgeArg.NextQuiz {
		room.NextQuiz()
	} else {
		room.History.Add(sg, buttons)
	}
}

func (room *Room) NumCanAnswer() int {
	r := 0
	for _, team := range room.Teams {
		if room.Rule.Team.Active && !room.SG.Team.CanPush(team.ID) {
			continue
		}
		if room.Rule.Team.ShareButton {
			if Int64Any(team.Players, func(id int64) bool {
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

func (room *Room) Wrong(judgeArg *JudgeArg, sound *Sound) {
	sg, buttons, rule := room.SG, room.Buttons, room.Rule
	id, err := buttons.RightPlayer()
	if err != nil {
		return
	}
	room.History.Save(sg, buttons)

	sg.Player.Wrong(id, rule, sound)
	sg.Team.CalcTeams(room.Teams, sg.Player, rule, sound)

	if judgeArg.NextQuiz {
		buttons.Answer(id)
		if room.NoCanAnswer() {
			room.NextQuiz()
		} else {
			room.History.NeedSave = true
		}
	} else {
		room.History.Add(sg, buttons)
	}
}

func (room *Room) NextQuiz() {
	sg, buttons, rule := room.SG, room.Buttons, room.Rule
	sg.Player.DecreaseLock(buttons)
	sg.Team.CalcTeams(room.Teams, sg.Player, rule, nil)
	buttons.Reset()
	room.History.Add(sg, buttons)
}

func (room *Room) UpdateBoards(newBoards Boards, sound *Sound) {
	sg, buttons, rule := room.SG, room.Buttons, room.Rule
	first, _ := buttons.RightPlayer()
	sound.Open = room.BG.Boards.Opens(newBoards)

	corrects := room.BG.Boards.Corrects(newBoards)
	sg.Player.CorrectBoard(corrects, first, rule, sound)
	wrongs := room.BG.Boards.Wrongs(newBoards)
	sg.Player.WrongBoard(wrongs, first, rule, sound)

	sg.Team.CalcTeams(room.Teams, sg.Player, rule, sound)

	if len(corrects) > 0 || len(wrongs) > 0 {
		room.History.Add(sg, buttons)
	}

	room.BG.Boards.Merge(newBoards)
}

func (room *Room) Through() {
	room.History.Save(room.SG, room.Buttons)
	room.BG.Reset()
	room.NextQuiz()
}

func (room *Room) Reset() {
	room.History.Save(room.SG, room.Buttons)
	room.Buttons.Reset()
	room.BG.Reset()
	room.History.Add(room.SG, room.Buttons)
}

func (room *Room) Clear(clearArg *ClearArg) {
	sg, buttons := room.SG, room.Buttons
	room.History.Save(sg, buttons)
	sg.Reset(clearArg.WinTimes)
	sg.Init(room.Rule)
	buttons.Reset()
	room.BG.Reset()
	if room.Timer != nil {
		timerRule := room.Rule.Other.Timer
		room.Timer.SetRemaining <- timerRule.Min*60 + timerRule.Sec
	}
	room.History.Add(sg, buttons)
}

func (room *Room) WinTop(sound *Sound) {
	room.History.Save(room.SG, room.Buttons)
	room.Reset()
	room.SG.Player.WinTop(room.Users.PlayerIDs(), room.Rule.Other, sound)
	room.History.Add(room.SG, room.Buttons)
}

func (room *Room) LoseBottom(sound *Sound) {
	room.History.Save(room.SG, room.Buttons)
	room.Reset()
	room.SG.Player.LoseBottom(room.Users.PlayerIDs(), room.Rule.Other, sound)
	room.History.Add(room.SG, room.Buttons)
}

func (room *Room) SetRule(rule *Rule) {
	if room.Rule.Team.Active && !rule.Team.Active {
		room.TruncateTeams()
	}
	if !room.Rule.Other.Timer.Active && rule.Other.Timer.Active {
		room.Timer = NewTimer(room)
		timerRule := rule.Other.Timer
		room.Timer.SetRemaining <- timerRule.Min*60 + timerRule.Sec
	} else if room.Rule.Other.Timer.Active && !rule.Other.Timer.Active {
		room.Timer.Destruct <- 0
		room.Timer = nil
	}
	room.Rule = rule
}

func (room *Room) UpdateScores(scores Scores) {
	sg, buttons, rule := room.SG, room.Buttons, room.Rule
	room.History.Save(sg, buttons)
	sg.Player.UpdateScores(scores, rule.Player)
	sg.Team.CalcTeams(room.Teams, sg.Player, rule, nil)
	room.History.Add(sg, buttons)
}

func (room *Room) TruncateTeams() {
	if len(room.Teams) > 1 {
		for _, team := range room.Teams[1:] {
			room.Teams.MergePlayersToFirst(team, room.Users)
			room.SG.Team.Remove(team.ID)
		}
		room.Teams = room.Teams[0:1]
	}
}

func (room *Room) ToggleTimer() {
	room.Timer.ToggleRunning <- 0
}

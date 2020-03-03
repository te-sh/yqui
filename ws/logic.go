package main

func (room *Room) JoinUser(name string) int64 {
	user := NewUser(name)
	id := user.ID
	room.Attendees.Users[id] = user
	room.Attendees.Players = append(room.Attendees.Players, id)
	room.Scores[id] = NewScore()
	room.History.Buffer[room.History.Curr][id] = NewScore()
	return id
}

func (room *Room) LeaveUser(id int64) {
	delete(room.Scores, id)
	if room.Attendees.Master == id {
		room.Attendees.Master = -1
	} else {
		room.Attendees.Players = Int64Remove(room.Attendees.Players, id)
	}
	delete(room.Attendees.Users, id)
}

func (room *Room) ToggleMaster(id int64) {
	if room.Attendees.Master == id {
		room.Attendees.Master = -1
		room.Attendees.Players = append(room.Attendees.Players, id)
	} else if room.Attendees.Master < 0 {
		room.Attendees.Master = id
		room.Attendees.Players = Int64Remove(room.Attendees.Players, id)
	}
}

func (room *Room) PushButton(id int64, time int64) (sound bool) {
	score := room.Scores[id]
	if Int64FindIndex(room.Buttons.Pushers, id) < 0 &&
		score.Lock == 0 && score.Win < 0 && score.Lose < 0 {
		sound = room.Buttons.Right == -1
		if sound {
			room.Buttons.Right = len(room.Buttons.Pushers)
		}
		room.Buttons.Pushers = append(room.Buttons.Pushers, id)
		room.Buttons.PushTimes = append(room.Buttons.PushTimes, time)
	}
	return
}

func (room *Room) Correct() (win bool) {
	buttons := room.Buttons
	if buttons.Right < 0 || buttons.Right >= len(buttons.Pushers) {
		return
	}
	id := buttons.Pushers[buttons.Right]
	rule := room.Rule

	if score, ok := room.Scores[id]; ok {
		score.Point += rule.PointCorrect
		win = rule.WinPoint.Active && score.Point >= rule.WinPoint.Value
		if win {
			room.Win(id)
		}
		room.AddHistory()
		room.NextQuiz(false)
	}
	return
}

func (room *Room) Wrong() (lose bool) {
	buttons := room.Buttons
	if buttons.Right < 0 || buttons.Right >= len(buttons.Pushers) {
		return
	}
	id := buttons.Pushers[buttons.Right]
	rule := room.Rule

	if score, ok := room.Scores[id]; ok {
		score.Point += rule.PointWrong
		score.Batsu += rule.BatsuWrong
		score.Lock = rule.LockWrong
		lose = (rule.LosePoint.Active && score.Point <= rule.LosePoint.Value ||
			    rule.LoseBatsu.Active && score.Batsu >= rule.LoseBatsu.Value)
		if lose {
			room.Lose(id)
		}
		room.AddHistory()
		if buttons.Right < rule.RightNum - 1 {
			if buttons.Right < len(buttons.Pushers) - 1 {
				buttons.Right += 1
			} else {
				buttons.Right = -1
			}
		} else {
			room.NextQuiz(false)
		}
	}
	return
}

func (room *Room) Win(target int64) {
	r := 0
	for id := range room.Scores {
		if room.Scores[id].Win >= 0 {
			r += 1
		}
	}
	room.Scores[target].Win = r
}

func (room *Room) Lose(target int64) {
	r := 0
	for id := range room.Scores {
		if room.Scores[id].Lose >= 0 {
			r += 1
		}
	}
	room.Scores[target].Lose = r
}

func (room *Room) NextQuiz(forceSub bool) {
	for id := range room.Scores {
		score := room.Scores[id]
		if (forceSub || Int64FindIndex(room.Buttons.Pushers, id) < 0) && score.Lock > 0 {
			score.Lock -= 1
		}
	}
	room.ResetButtons()
}

func (room *Room) ResetButtons() {
	room.Buttons.Pushers = nil
	room.Buttons.PushTimes = nil
	room.Buttons.Right = -1
}

func (room *Room) AllClear() {
	room.ResetButtons()
	for id := range room.Scores {
		score := room.Scores[id]
		score.Point = 0
		score.Batsu = 0
		score.Lock = 0
		score.Win = -1
		score.Lose = -1
	}
	room.AddHistory()
}


func (room *Room) AddHistory() {
	history := room.History
	history.Buffer = history.Buffer[:history.Curr + 1]
	newScores := make(map[int64]*Score)
	for id := range room.Scores {
		newScore := *room.Scores[id]
		newScores[id] = &newScore
	}
	history.Buffer = append(history.Buffer, newScores)
	history.Curr += 1

	if len(history.Buffer) > HistoryMaxLen {
		history.Curr -= len(history.Buffer) - HistoryMaxLen
		history.Buffer = history.Buffer[len(history.Buffer) - HistoryMaxLen:]
	}
}

func (room *Room) MoveHistory(d int) {
	history := room.History
	i := history.Curr + d
	if i < 0 || i >= len(history.Buffer) {
		return
	}

	scores := history.Buffer[i]
	for id := range scores {
		if _, ok := room.Scores[id]; ok {
			score := *scores[id]
			room.Scores[id] = &score
		}
	}
	history.Curr = i
}

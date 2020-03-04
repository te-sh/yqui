package main

func (room *Room) JoinUser(conn *Conn, name string) int64 {
	user := NewUser(conn, name)
	id := user.ID

	room.Users[id] = user
	room.Attendees.Players = append(room.Attendees.Players, id)
	room.Scores[id] = NewScore()
	room.History.Items[room.History.Curr].Scores[id] = NewScore()

	room.SendToOne(id, "selfID", id)
	room.SendToOne(id, "rule", room.Rule)

	room.Broadcast("users", room.Users)
	room.Broadcast("attendees", room.Attendees)
	room.Broadcast("buttons", room.Buttons)
	room.Broadcast("scores", room.Scores)

	return id
}

func (room *Room) LeaveUser(id int64) {
	delete(room.Users, id)
	if room.Attendees.Master == id {
		room.Attendees.Master = -1
	} else {
		room.Attendees.Players = Int64Remove(room.Attendees.Players, id)
	}
	delete(room.Scores, id)

	room.Broadcast("attendees", room.Attendees)
	room.Broadcast("buttons", room.Buttons)
	room.Broadcast("scores", room.Scores)
}

func (room *Room) ToggleMaster(id int64) {
	if room.Attendees.Master == id {
		room.Attendees.Master = -1
		room.Attendees.Players = append(room.Attendees.Players, id)
	} else if room.Attendees.Master < 0 {
		room.Attendees.Master = id
		room.Attendees.Players = Int64Remove(room.Attendees.Players, id)
	}
	room.Broadcast("attendees", room.Attendees)
}

func (room *Room) PushButton(id int64, time int64) {
	score := room.Scores[id]
	if Int64FindIndex(room.Buttons.Pushers, id) < 0 &&
		score.Lock == 0 && score.Win == 0 && score.Lose == 0 {
		if room.Buttons.Right == -1 {
			room.Buttons.Right = len(room.Buttons.Pushers)
			room.Broadcast("push", "sound")
		}
		room.Buttons.Pushers = append(room.Buttons.Pushers, id)
		room.Buttons.PushTimes = append(room.Buttons.PushTimes, time)
	}
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) Correct() {
	buttons := room.Buttons
	if buttons.Right < 0 || buttons.Right >= len(buttons.Pushers) {
		return
	}
	id := buttons.Pushers[buttons.Right]
	rule := room.Rule

	if score, ok := room.Scores[id]; ok {
		score.Point += rule.PointCorrect
		if rule.WinPoint.Active && score.Point >= rule.WinPoint.Value {
			room.Win(id)
			room.Broadcast("sound", "correct,roundwin")
		} else {
			room.Broadcast("sound", "correct")
		}
		room.NextQuiz(false)
		room.AddHistory()
	}
}

func (room *Room) Wrong() {
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
		if (rule.LosePoint.Active && score.Point <= rule.LosePoint.Value) ||
		   (rule.LoseBatsu.Active && score.Batsu >= rule.LoseBatsu.Value) {
			room.Lose(id)
		}
		if buttons.Right < rule.RightNum - 1 {
			if buttons.Right < len(buttons.Pushers) - 1 {
				buttons.Right += 1
			} else {
				buttons.Right = -1
			}
		} else {
			room.NextQuiz(false)
		}
		room.AddHistory()
	}
	room.Broadcast("sound", "wrong")
}

func (room *Room) Win(target int64) {
	room.WinNum += 1
	room.Scores[target].Win = room.WinNum
}

func (room *Room) Lose(target int64) {
	room.LoseNum += 1
	room.Scores[target].Lose = room.LoseNum
}

func (room *Room) NextQuiz(forceSub bool) {
	for id := range room.Scores {
		score := room.Scores[id]
		if (forceSub || Int64FindIndex(room.Buttons.Pushers, id) < 0) && score.Lock > 0 {
			score.Lock -= 1
		}
	}
	room.ResetButtons()
	room.Broadcast("scores", room.Scores)
}

func (room *Room) ResetButtons() {
	room.Buttons.Pushers = nil
	room.Buttons.PushTimes = nil
	room.Buttons.Right = -1
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) AllClear() {
	room.ResetButtons()
	for id := range room.Scores {
		score := room.Scores[id]
		score.Point = 0
		score.Batsu = 0
		score.Lock = 0
		score.Win = 0
		score.Lose = 0
	}
	room.WinNum = 0
	room.LoseNum = 0
	room.AddHistory()
	room.Broadcast("scores", room.Scores)
}


func (room *Room) AddHistory() {
	history := room.History
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	for id := range room.Scores {
		score := *room.Scores[id]
		item.Scores[id] = &score
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
			score := *item.Scores[id]
			room.Scores[id] = &score
		}
	}
	room.WinNum = item.WinNum
	room.LoseNum = item.LoseNum

	history.Curr = i
	room.Broadcast("scores", room.Scores)
}

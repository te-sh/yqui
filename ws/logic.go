package main

func (room *Room) JoinUser(conn *Conn, name string, time int64) int64 {
	user := NewUser(conn, name)
	id := user.ID

	room.Users[id] = user
	room.Attendees.Players = append(room.Attendees.Players, id)
	room.Scores[id] = NewScore()
	room.History.Items[room.History.Curr].Scores[id] = NewScore()

	room.SendToOne(id, "selfID", id)
	room.SendToOne(id, "rule", room.Rule)

	room.SendUsers()
	room.SendAttendees()
	room.SendButtons()
	room.SendScores()

	chat := Chat{Type: "join", Time: time, Name: name}
	room.Broadcast("chat", chat)

	return id
}

func (room *Room) LeaveUser(id int64, time int64) {
	name := room.Users[id].Name

	delete(room.Users, id)
	if room.Attendees.Master == id {
		room.Attendees.Master = -1
	} else {
		room.Attendees.Players = Int64Remove(room.Attendees.Players, id)
	}
	delete(room.Scores, id)

	room.SendAttendees()
	room.SendButtons()
	room.SendScores()

	chat := Chat{Type: "leave", Time: time, Name: name}
	room.Broadcast("chat", chat)
}

func (room *Room) ToggleMaster(id int64) {
	if room.Attendees.Master == id {
		room.Attendees.Master = -1
		room.Attendees.Players = append(room.Attendees.Players, id)
	} else if room.Attendees.Master < 0 {
		room.Attendees.Master = id
		room.Attendees.Players = Int64Remove(room.Attendees.Players, id)
	}
	room.SendAttendees()
}

func (room *Room) PushButton(id int64, time int64) {
	if !room.Buttons.Pushed(id) && room.Scores[id].CanPush() {
		if room.Buttons.Right == -1 {
			room.Buttons.Right = len(room.Buttons.Pushers)
			room.Broadcast("sound", "push")
		}
		room.Buttons.Pushers = append(room.Buttons.Pushers, id)
		room.Buttons.PushTimes = append(room.Buttons.PushTimes, time)
	}
	room.SendButtons()
}

func (room *Room) Correct() (win bool) {
	buttons := room.Buttons
	if buttons.Right < 0 || buttons.Right >= len(buttons.Pushers) {
		return
	}
	id := buttons.Pushers[buttons.Right]

	if score, ok := room.Scores[id]; ok {
		win = score.Correct(room.Rule)
		room.NextQuiz(true)
		room.AddHistory()
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
		lose = score.Wrong(rule)
		room.Buttons.Answerers = append(room.Buttons.Answerers, id)
		if buttons.Right < rule.RightNum - 1 &&
		   buttons.Right < len(room.Attendees.Players) - 1 {
			if buttons.Right < len(buttons.Pushers) - 1 {
				buttons.Right += 1
			} else {
				buttons.Right = -1
			}
		} else {
			room.NextQuiz(false)
		}
		room.SendButtons()
		room.SendScores()
		room.AddHistory()
	}
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

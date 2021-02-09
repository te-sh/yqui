package main

func (room *Room) SendRoom() {
	roomLog := room.Clone()
	if !room.Rule.Board.Active {
		roomLog.BG = nil
	}
	LogJson("write", "room", roomLog)
	for id, user := range room.Users {
		newRoom := room.Clone()
		if room.Rule.Board.Active {
			room.HideBG(newRoom.BG, user)
		} else {
			newRoom.BG = nil
		}
		room.HideSG(newRoom.SG, user)
		room.SendToOne(id, "room", newRoom)
	}
}

func (room *Room) HideBG(bg *BoardGroup, user *User) {
	for _, board := range bg.Boards {
		if !user.IsMaster && user.ID != board.ID && !board.Open {
			board.Reset()
		}
	}
}

func (room *Room) SendBG() {
	if room.Rule.Board.Active {
		LogJson("write", "bg", room.BG)
		for id, user := range room.Users {
			newBG := room.BG.Clone()
			room.HideBG(newBG, user)
			room.SendToOne(id, "bg", newBG)
		}
	}
}

func (room *Room) SendBoard(id int64) {
	if board, ok := room.BG.Boards[id]; ok {
		LogJson("write", "board", board)
		if board.Open {
			room.Broadcast("board", board)
		} else {
			room.SendToOne(id, "board", board)
			room.SendToMaster("board", board)
		}
	}
}

func (room *Room) SendButtons() {
	LogJson("write", "buttons", room.Buttons)
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) HideSG(sg *ScoreGroup, user *User) {
	if !user.IsMaster && !room.Rule.ShowPoint {
		sg.SetZero()
	}
}

func (room *Room) SendSG() {
	LogJson("write", "sg", room.SG)
	for id, user := range room.Users {
		newSG := room.SG.Clone()
		room.HideSG(newSG, user)
		room.SendToOne(id, "sg", newSG)
	}
}

func (room *Room) SendTimer() {
	LogJson("write", "timer", room.Timer)
	room.Broadcast("timer", room.Timer)
}

func (room *Room) SendChat(chat Chat) {
	LogJson("write", "chat", chat)
	room.Broadcast("chat", chat)
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if sounds != "" {
		LogJson("write", "sounds", sounds)
		room.Broadcast("sound", sounds)
	}
}

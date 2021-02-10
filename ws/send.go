package main

func (room *Room) SendRoom() {
	roomLog := room.Clone()
	if !room.Rule.Board.Active {
		roomLog.BG = nil
	}
	LogInfo("write", Log{Message: "room", Json: roomLog})
	for id, user := range room.Users {
		newRoom := room.Clone()
		if room.Rule.Board.Active {
			room.HideBG(newRoom.BG, user)
		} else {
			newRoom.BG = nil
		}
		room.HideSG(newRoom.SG, user)
		SendToOne(id, "room", newRoom)
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
		LogInfo("write", Log{Message: "bg", Json: room.BG})
		for id, user := range room.Users {
			newBG := room.BG.Clone()
			room.HideBG(newBG, user)
			SendToOne(id, "bg", newBG)
		}
	}
}

func (room *Room) SendBoard(id int64) {
	if board, ok := room.BG.Boards[id]; ok {
		LogInfo("write", Log{Message: "board", Json: board})
		if board.Open {
			room.Broadcast("board", board)
		} else {
			SendToOne(id, "board", board)
			room.SendToMaster("board", board)
		}
	}
}

func (room *Room) SendButtons() {
	LogInfo("write", Log{Message: "buttons", Json: room.Buttons})
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) HideSG(sg *ScoreGroup, user *User) {
	if !user.IsMaster && !room.Rule.ShowPoint {
		sg.SetZero()
	}
}

func (room *Room) SendSG() {
	LogInfo("write", Log{Message: "sg", Json: room.SG})
	for id, user := range room.Users {
		newSG := room.SG.Clone()
		room.HideSG(newSG, user)
		SendToOne(id, "sg", newSG)
	}
}

func (room *Room) SendTimer() {
	LogInfo("write", Log{Message: "timer", Json: room.Timer})
	room.Broadcast("timer", room.Timer)
}

func (room *Room) SendChat(chat Chat) {
	LogInfo("write", Log{Message: "chat", Json: chat})
	room.Broadcast("chat", chat)
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if sounds != "" {
		LogInfo("write", Log{Message: "sounds", Json: sounds})
		room.Broadcast("sound", sounds)
	}
}

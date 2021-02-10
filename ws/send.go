package main

func (room *Room) SendRoom() {
	LogInfo("write", Log{Message: "room", Json: room})
	room.Broadcast("room", room)
	if room.Rule.Board.Active {
		room.SendBG()
	}
	room.SendSG()
}

func (room *Room) SendBG() {
	if room.Rule.Board.Active {
		LogInfo("write", Log{Message: "bg", Json: room.BG})
		for id, user := range room.Users {
			newBG := room.BG.Clone()
			for _, board := range newBG.Boards {
				if !user.IsMaster && user.ID != board.ID && !board.Open {
					board.Reset()
				}
			}
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

func (room *Room) SendSG() {
	LogInfo("write", Log{Message: "sg", Json: room.SG})
	for id, user := range room.Users {
		newSG := room.SG.Clone()
		if !user.IsMaster && !room.Rule.ShowPoint {
			newSG.SetZero()
		}
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

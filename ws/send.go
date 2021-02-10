package main

func (room *Room) SendRoom() {
	room.Broadcast("room", room)
	room.SendRule()
	room.SendBG()
	room.SendSG()
}

func (room *Room) SendRule() {
	room.Broadcast("rule", room.Rule)
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
	room.Broadcast("timer", room.Timer)
}

func (room *Room) SendChat(chat Chat) {
	room.Broadcast("chat", chat)
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if len(sounds) > 0 {
		room.Broadcast("sound", sounds)
	}
}

func (room *Room) Broadcast(typ string, content interface{}) {
	SendToOnes(room.Users.IDs(), typ, content)
}

func (room *Room) SendToMaster(typ string, content interface{}) {
	if id, ok := room.Users.MasterID(); ok {
		SendToOne(id, typ, content)
	}
}

package main

func (room *Room) SendRoom() {
	room.Broadcast("room", room, true)
	room.SendRule()
	room.SendBG()
	room.SendSG()
}

func (room *Room) SendRule() {
	room.Broadcast("rule", room.Rule, true)
}

func (room *Room) SendBG() {
	if room.Rule.Board.Active {
		room.SendToMaster("bg", room.BG, true)

		newBG := room.BG.Clone()
		for _, board := range newBG.Boards {
			if !board.Open {
				board.Reset()
			}
		}
		room.SendToExceptMaster("bg", newBG, false)

		for _, board := range room.BG.Boards {
			if !board.Open {
				SendToOne(board.ID, "board", board, false)
			}
		}
	}
}

func (room *Room) SendBoard(id int64) {
	if board, ok := room.BG.Boards[id]; ok {
		if board.Open {
			room.Broadcast("board", board, true)
		} else {
			room.SendToMaster("board", board, true)
			SendToOne(id, "board", board, false)
		}
	}
}

func (room *Room) SendButtons() {
	room.Broadcast("buttons", room.Buttons, true)
}

func (room *Room) SendSG() {
	if room.Rule.ShowPoint {
		room.Broadcast("sg", room.SG, true)
	} else {
		room.SendToMaster("sg", room.SG, true)

		newSG := room.SG.Clone()
		newSG.SetZero()
		room.SendToExceptMaster("sg", newSG, false)
	}
}

func (room *Room) SendTimer() {
	room.Broadcast("timer", room.Timer, true)
}

func (room *Room) SendChat(chat Chat) {
	room.Broadcast("chat", chat, true)
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if len(sounds) > 0 {
		room.Broadcast("sound", sounds, true)
	}
}

func (room *Room) Broadcast(typ string, content interface{}, log bool) {
	SendToOnes(room.Users.IDs(), typ, content, log)
}

func (room *Room) SendToMaster(typ string, content interface{}, log bool) {
	if id, ok := room.Users.MasterID(); ok {
		SendToOne(id, typ, content, log)
	}
}

func (room *Room) SendToExceptMaster(typ string, content interface{}, log bool) {
	if id, ok := room.Users.MasterID(); ok {
		SendToOnes(Int64Remove(room.Users.IDs(), id), typ, content, log)
	} else {
		room.Broadcast(typ, content, log)
	}
}

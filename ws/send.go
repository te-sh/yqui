package main

func (room *Room) SendRoom() {
	LogJson("room", room)
	for id, user := range room.Users {
		newRoom := room.Clone()
		newRoom.BG = room.HideBG(room.BG, user)
		newRoom.SG = room.HideSG(room.SG, user)
		room.SendToOne(id, "room", newRoom)
	}
}

func (room *Room) HideBG(bg *BoardGroup, user *User) *BoardGroup {
	for _, board := range room.BG.Boards {
		if !user.IsMaster && user.ID != board.ID && !board.Open {
			board.Reset()
		}
	}
	return bg
}

func (room *Room) SendBG() {
	LogJson("bg", room.BG)
	for id, user := range room.Users {
		bg := room.HideBG(room.BG.Clone(), user)
		room.SendToOne(id, "bg", bg)
	}
}

func (room *Room) SendBoard(id int64) {
	if board, ok := room.BG.Boards[id]; ok {
		LogJson("board", board)
		if board.Open {
			room.Broadcast("board", board)
		} else {
			room.SendToOne(id, "board", board)
			room.SendToMaster("board", board)
		}
	}
}

func (room *Room) SendButtons() {
	LogJson("buttons", room.Buttons)
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) HideSG(sg *ScoreGroup, user *User) *ScoreGroup {
	if !user.IsMaster && !room.Rule.ShowPoint {
		sg.SetZero()
	}
	return sg
}

func (room *Room) SendSG() {
	LogJson("sg", room.SG)
	for id, user := range room.Users {
		sg := room.HideSG(room.SG.Clone(), user)
		room.SendToOne(id, "sg", sg)
	}
}

func (room *Room) SendChat(chat Chat) {
	LogJson("chat", chat)
	room.Broadcast("chat", chat)
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if sounds != "" {
		LogJson("sounds", sounds)
		room.Broadcast("sound", sounds)
	}
}

package main

func (room *Room) SendRoom() {
	for id, user := range room.Users {
		newRoom := room.Clone()
		newRoom.Boards = room.HideBoards(user)
		newRoom.SG = room.HideSG(user)
		room.SendToOne(id, "room", newRoom)
	}
}

func (room *Room) HideBoards(user *User) Boards {
	boards := room.Boards.Clone()
	for _, board := range room.Boards {
		if !user.IsMaster && user.ID != board.ID && !board.Open {
			board.Reset()
		}
	}
	return boards
}

func (room *Room) SendBoards() {
	for id, user := range room.Users {
		boards := room.HideBoards(user)
		room.SendToOne(id, "boards", boards)
	}
}

func (room *Room) SendBoard(id int64) {
	if board, ok := room.Boards[id]; ok {
		if board.Open {
			room.Broadcast("board", board)
		} else {
			room.SendToOne(id, "board", board)
			room.SendToMaster("board", board)
		}
	}
}

func (room *Room) SendBoardLock() {
	room.Broadcast("boardLock", room.BoardLock)
}

func (room *Room) SendButtons() {
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) HideSG(user *User) *ScoreGroup {
	sg := room.SG.Clone()
	if !user.IsMaster && !room.Rule.ShowPoint {
		sg.SetZero()
	}
	return sg
}

func (room *Room) SendSG() {
	for id, user := range room.Users {
		sg := room.HideSG(user)
		room.SendToOne(id, "sg", sg)
	}
}

func (room *Room) SendChat(chat Chat) {
	room.Broadcast("chat", chat)
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if sounds != "" {
		room.Broadcast("sound", sounds)
	}
}

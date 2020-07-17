package main

func (room *Room) SendSelfID(id int64) {
	room.SendToOne(id, "selfID", id)
}

type RoomSend struct {
	Users Users `json:"users"`
	Teams Teams `json:"teams"`
	Master int64 `json:"master"`
	SG *ScoreGroup `json:"sg"`
	Buttons *Buttons `json:"buttons"`
}

func (room *Room) SendRoom() {
	roomSend := RoomSend{
		Users: room.Users,
		Teams: room.Teams,
		Master: room.Master,
		SG: room.SG,
		Buttons: room.Buttons,
	}
	room.Broadcast("room", roomSend)
}

func (room *Room) SendBoards() {
	for id, _ := range room.Boards {
		boards := make(Boards)
		for id2, board := range room.Boards {
			if id == room.Master || id == id2 || board.Open {
				boards[id2] = board
			} else {
				boards[id2] = NewBoard(id2)
			}
		}
		room.SendToOne(id, "boards", boards)
	}
}

func (room *Room) SendBoard(id int64) {
	board := room.Boards[id]
	if board.Open {
		room.Broadcast("board", board)
	} else {
		room.SendToOne(id, "board", board)
		room.SendToMaster("board", board)
	}
}

func (room *Room) SendBoardLock() {
	room.Broadcast("boardLock", room.BoardLock)
}

func (room *Room) SendButtons() {
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) SendScores() {
	sg := room.SG.Clone()
	room.SendToMaster("sg", sg)

	if !room.Rule.ShowPoint {
		sg.SetZero()
	}
	room.SendToPlayers("sg", sg)
}

func (room *Room) SendRule() {
	room.SendScores()
	room.Broadcast("rule", room.Rule)
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

package main

type RoomSend struct {
	Users Users `json:"users"`
	Teams Teams `json:"teams"`
	SG *ScoreGroup `json:"sg"`
	Buttons *Buttons `json:"buttons"`
	Rule *Rule `json:"rule"`
}

func (room *Room) SendRoom() {
	roomSend := RoomSend{
		Users: room.Users,
		Teams: room.Teams,
		SG: room.SG,
		Buttons: room.Buttons,
		Rule: room.Rule,
	}
	room.Broadcast("room", roomSend)
}

func (room *Room) SendBoards() {
	for userID, user := range room.Users {
		boards := make(Boards)
		for id, board := range room.Boards {
			if user.IsMaster || id == userID || board.Open {
				boards[id] = board
			} else {
				boards[id] = NewBoard(id)
			}
		}
		room.SendToOne(userID, "boards", boards)
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

func (room *Room) SendChat(chat Chat) {
	room.Broadcast("chat", chat)
}


func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if sounds != "" {
		room.Broadcast("sound", sounds)
	}
}

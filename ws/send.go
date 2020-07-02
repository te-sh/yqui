package main

type RoomSend struct {
	Users map[int64]*User `json:"users"`
	Teams Teams `json:"teams"`
	Master int64 `json:"master"`
	Scores Scores `json:"scores"`
	TeamScores Scores `json:"teamScores"`
	Buttons *Buttons `json:"buttons"`
}

func (room *Room) SendRoom() {
	roomSend := RoomSend{
		Users: room.Users,
		Teams: room.Teams,
		Master: room.Master,
		Scores: room.Scores,
		TeamScores: room.TeamScores,
		Buttons: room.Buttons,
	}
	room.Broadcast("room", roomSend)
}

func (room *Room) SendUsers() {
	room.Broadcast("users", room.Users)
}

type TeamsSend struct {
	Teams Teams `json:"teams"`
	Master int64 `json:"master"`
	Scores Scores `json:"scores"`
	TeamScores Scores `json:"teamScores"`
}

func (room *Room) SendTeams() {
	teamsSend := TeamsSend{
		Teams: room.Teams,
		Master: room.Master,
		Scores: room.Scores,
		TeamScores: room.TeamScores,
	}
	room.Broadcast("teams", teamsSend)
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

type ScoresSend struct {
	Scores Scores `json:"scores"`
	TeamScores Scores `json:"teamScores"`
}

func (room *Room) SendScores() {
	scoresSend := ScoresSend{
		Scores: room.Scores.Clone(),
		TeamScores: room.TeamScores.Clone(),
	}
	room.SendToMaster("scores", scoresSend)

	if !room.Rule.ShowPoint {
		for _, score := range scoresSend.Scores {
			score.Point = 0
			score.Batsu = 0
		}
		for _, teamScore := range scoresSend.TeamScores {
			teamScore.Point = 0
			teamScore.Batsu = 0
		}
	}
	room.SendToPlayers("scores", scoresSend)
}

func (room *Room) SendRule() {
	room.SendScores()
	room.Broadcast("rule", room.Rule)
}

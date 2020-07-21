package main

type Boards map[int64]*Board

type Board struct {
	ID int64 `json:"id"`
	Text string `json:"text"`
	Correct string `json:"correct"`
	Open bool `json:"open"`
}

func NewBoard(id int64) *Board {
	board := new(Board)
	board.ID = id
	board.Text = ""
	board.Correct = "none"
	board.Open = false
	return board
}

func (boards Boards) Add(id int64) {
	boards[id] = NewBoard(id)
}

func (boards Boards) Remove(id int64) {
	delete(boards, id)
}

func (boards Boards) Opens(newBoards Boards) bool {
	open := false
	for _, newBoard := range newBoards {
		open = open || boards.Open(newBoard)
	}
	return open
}

func (boards Boards) Open(newBoard *Board) bool {
	id := newBoard.ID
	if board, ok := boards[id]; ok {
		return !board.Open && newBoard.Open
	} else {
		return false
	}
}

func (boards Boards) Corrects(newBoards Boards) []int64 {
	var corrects []int64
	for id, newBoard := range newBoards {
		if boards.Correct(newBoard) {
			corrects = append(corrects, id)
		}
	}
	return corrects
}

func (boards Boards) Correct(newBoard *Board) bool {
	id := newBoard.ID
	if board, ok := boards[id]; ok {
		return (!board.Open && newBoard.Open && newBoard.Correct == "correct") ||
			(board.Open && board.Correct != "correct" && newBoard.Correct == "correct")
	} else {
		return false
	}
}

func (boards Boards) Wrongs(newBoards Boards) []int64 {
	var wrongs []int64
	for id, newBoard := range newBoards {
		if boards.Wrong(newBoard) {
			wrongs = append(wrongs, id)
		}
	}
	return wrongs
}

func (boards Boards) Wrong(newBoard *Board) bool {
	id := newBoard.ID
	if board, ok := boards[id]; ok {
		return (!board.Open && newBoard.Open && newBoard.Correct == "wrong") ||
			(board.Open && board.Correct != "wrong" && newBoard.Correct == "wrong")
	} else {
		return false
	}
}

package main

type Board struct {
	ID int64 `json:"id"`
	Text string `json:"text"`
	Correct bool `json:"correct"`
	Open bool `json:"open"`
}

func NewBoard(id int64) *Board {
	board := new(Board)
	board.ID = id
	board.Text = ""
	board.Correct = false
	board.Open = false
	return board
}

type Boards map[int64]*Board

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
		return !board.Open && newBoard.Open && newBoard.Correct ||
			board.Open && !board.Correct && newBoard.Correct
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
		return !board.Open && newBoard.Open && !newBoard.Correct ||
			board.Open && board.Correct && !newBoard.Correct
	} else {
		return false
	}
}

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
	board := boards[id]
	return !board.Open && newBoard.Open && newBoard.Correct ||
		board.Open && !board.Correct && newBoard.Correct
}

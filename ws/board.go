package main

type Boards map[int64]*Board

type Board struct {
	ID      int64  `json:"id"`
	Text    string `json:"text"`
	Correct string `json:"correct"`
	Open    bool   `json:"open"`
}

func NewBoards() Boards {
	boards := make(Boards)
	return boards
}

func NewBoard() *Board {
	board := new(Board)
	board.Reset()
	return board
}

func (boards Boards) Clone() Boards {
	newBoards := make(Boards)
	for id, board := range boards {
		newBoards[id] = board.Clone()
	}
	return newBoards
}

func (board *Board) Clone() *Board {
	newBoard := *board
	return &newBoard
}

func (boards Boards) Reset() {
	for _, board := range boards {
		board.Reset()
	}
}

func (board *Board) Reset() {
	board.Text = ""
	board.Correct = "none"
	board.Open = false
}

func (boards Boards) Merge(newBoards Boards) {
	for id, _ := range boards {
		if newBoard, ok := newBoards[id]; ok {
			boards[id] = newBoard
		}
	}
}

func (boards Boards) Add(id int64) {
	board := NewBoard()
	board.ID = id
	boards[id] = board
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
	if board, ok := boards[newBoard.ID]; ok {
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
	if board, ok := boards[newBoard.ID]; ok {
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
	if board, ok := boards[newBoard.ID]; ok {
		return (!board.Open && newBoard.Open && newBoard.Correct == "wrong") ||
			(board.Open && board.Correct != "wrong" && newBoard.Correct == "wrong")
	} else {
		return false
	}
}

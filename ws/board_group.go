package main

type BoardGroup struct {
	Boards Boards `json:"boards"`
	Lock   bool   `json:"lock"`
}

func NewBoardGroup() *BoardGroup {
	bg := new(BoardGroup)
	bg.Boards = NewBoards()
	bg.Lock = false
	return bg
}

func (bg *BoardGroup) Clone() *BoardGroup {
	newBG := *bg
	newBG.Boards = bg.Boards.Clone()
	return &newBG
}

func (bg *BoardGroup) Reset() {
	bg.Boards.Reset()
	bg.Lock = false
}

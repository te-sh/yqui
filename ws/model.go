package main

type Room struct {
	Users map[int64]*User
	UserIDs []int64
	Teams Teams
	Master int64
	Boards map[int64]*Board
	BoardLock bool
	Scores Scores
	TeamScores Scores
	WinLose *WinLose
	Buttons *Buttons
	Rule *Rule
	History *History
}

func NewRoom() *Room {
	room := new(Room)
	room.Users = make(map[int64]*User)
	room.Master = -1
	room.Boards = make(map[int64]*Board)
	room.BoardLock = false
	room.Scores = make(Scores)
	room.TeamScores = make(Scores)
	room.WinLose = NewWinLose()
	room.Buttons = NewButtons()
	room.Rule = NewRule()
	room.History = NewHistory()
	return room
}

type User struct {
	ID int64 `json:"id"`
	Conn *Conn `json:"-"`
	Team *Team `json:"-"`
	Name string `json:"name"`
	ChatAnswer bool `json:"chatAnswer"`
}

func NewUser(id int64, conn *Conn, name string) *User {
	user := new(User)
	user.ID = id
	user.Conn = conn
	user.Name = name
	return user
}

type Board struct {
	Text string `json:"text"`
	Correct bool `json:"correct"`
	Open bool `json:"open"`
}

func NewBoard() *Board {
	board := new(Board)
	board.Text = ""
	board.Correct = false
	board.Open = false
	return board
}

type Rule struct {
	RightNum int `json:"rightNum"`
	PointCorrect int `json:"pointCorrect"`
	BonusCorrect string `json:"bonusCorrect"`
	PointWrong int `json:"pointWrong"`
	BatsuWrong int `json:"batsuWrong"`
	LockWrong int `json:"lockWrong"`
	WinPoint ActiveAndValue `json:"winPoint"`
	LosePoint ActiveAndValue `json:"losePoint"`
	LoseBatsu ActiveAndValue `json:"loseBatsu"`
	ShowPoint bool `json:"showPoint"`
	ShareButton bool `json:"shareButton"`
	TeamPoint string `json:"teamPoint"`
	TeamBatsu string `json:"teamBatsu"`
	Board bool `json:"board"`
	BoardPointCorrect int `json:"boardPointCorrect"`
	BoardApplyNormal bool `json:"boardApplyNormal"`
}

type ActiveAndValue struct {
	Active bool `json:"active"`
	Value int `json:"value"`
}

func NewRule() *Rule {
	rule := new(Rule)
	rule.RightNum = 1
	rule.PointCorrect = 1
	rule.BonusCorrect = "none"
	rule.PointWrong = 0
	rule.BatsuWrong = 1
	rule.LockWrong = 0
	rule.WinPoint = ActiveAndValue{true, 7}
	rule.LosePoint = ActiveAndValue{false, 0}
	rule.LoseBatsu = ActiveAndValue{true, 3}
	rule.ShowPoint = true
	rule.ShareButton = false
	rule.TeamPoint = "sum"
	rule.TeamBatsu = "sum"
	rule.Board = false
	rule.BoardPointCorrect = 1
	rule.BoardApplyNormal = true
	return rule
}

type Chat struct {
	Type string `json:"type"`
	Time int64 `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

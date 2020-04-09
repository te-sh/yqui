package main

type Room struct {
	Users map[int64]*User
	UserIDs []int64
	Teams Teams
	Master int64
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
	room.Scores = make(Scores)
	room.TeamScores = make(Scores)
	for _, team := range room.Teams {
		room.TeamScores[team.ID] = NewScore()
	}
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

func NewUser(conn *Conn, name string) *User {
	user := new(User)
	user.ID = NewID()
	user.Conn = conn
	user.Name = name
	return user
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
	return rule
}

type Chat struct {
	Type string `json:"type"`
	Time int64 `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

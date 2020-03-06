package main

type Score struct {
	Point int `json:"point"`
	Batsu int `json:"batsu"`
	Lock int `json:"lock"`
	Win int `json:"win"`
	Lose int `json:"lose"`
}

func NewScore() *Score {
	score := new(Score)
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Win = 0
	score.Lose = 0
	return score
}

func (score *Score) Clone() *Score {
	newScore := *score
	return &newScore
}

func (score *Score) Reset() {
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Win = 0
	score.Lose = 0
}

func (score *Score) CanPush() bool {
	return score.Lock == 0 && score.Win == 0 && score.Lose == 0
}

func (score *Score) Correct(rule *Rule) (win bool) {
	score.Point += rule.PointCorrect
	win = rule.WinPoint.Active && score.Point >= rule.WinPoint.Value
	if win {
		room.WinNum += 1
		score.Win = room.WinNum
	}
	return
}

func (score *Score) Wrong(rule *Rule) (lose bool) {
	score.Point += rule.PointWrong
	score.Batsu += rule.BatsuWrong
	score.Lock = rule.LockWrong
	lose = (rule.LosePoint.Active && score.Point <= rule.LosePoint.Value) ||
		   (rule.LoseBatsu.Active && score.Batsu >= rule.LoseBatsu.Value)
	if lose {
		room.LoseNum += 1
		score.Lose = room.LoseNum
	}
	return
}

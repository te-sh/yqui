package main

type ScoreSet struct {
	Scores  Scores   `json:"scores"`
	WinLose *WinLose `json:"-"`
}

type Scores map[int64]*Score

type Score struct {
	Point       int  `json:"point"`
	Batsu       int  `json:"batsu"`
	Lock        int  `json:"lock"`
	CompPoint   int  `json:"compPoint"`
	ConsCorrect int  `json:"consCorrect"`
	PassSeat    bool `json:"passSeat"`
	Win         int  `json:"win"`
	Lose        int  `json:"lose"`
	WinTimes    int  `json:"winTimes"`
}

func NewScoreSet() *ScoreSet {
	ss := new(ScoreSet)
	ss.Scores = make(Scores)
	ss.WinLose = NewWinLose()
	return ss
}

func NewScore() *Score {
	score := new(Score)
	score.Reset(nil)
	return score
}

func (ss *ScoreSet) Clone() *ScoreSet {
	newSS := NewScoreSet()
	newSS.Scores = ss.Scores.Clone()
	newSS.WinLose = ss.WinLose.Clone()
	return newSS
}

func (scores Scores) Clone() Scores {
	newScores := make(Scores)
	for id, score := range scores {
		newScores[id] = score.Clone()
	}
	return newScores
}

func (score *Score) Clone() *Score {
	newScore := *score
	return &newScore
}

func (ss *ScoreSet) Reset(clearArg *ClearArg) {
	ss.Scores.Reset(clearArg)
	ss.WinLose.Reset(clearArg)
}

func (scores Scores) Reset(clearArg *ClearArg) {
	for _, score := range scores {
		score.Reset(clearArg)
	}
}

func (score *Score) Reset(clearArg *ClearArg) {
	if (score.Win == 0 && score.Lose == 0) ||
		(score.Win != 0 && (clearArg == nil || clearArg.Win)) ||
		(score.Lose != 0 && (clearArg == nil || clearArg.Lose)) {
		score.Point = 0
		score.Batsu = 0
		score.Lock = 0
		score.CompPoint = 0
		score.ConsCorrect = 0
		score.PassSeat = false
	}
	if clearArg == nil || clearArg.Win {
		score.Win = 0
	}
	if clearArg == nil || clearArg.Lose {
		score.Lose = 0
	}
	if clearArg == nil || clearArg.WinTimes {
		score.WinTimes = 0
	}
}

func (ss *ScoreSet) Add(id int64) {
	ss.Scores[id] = NewScore()
}

func (ss *ScoreSet) Remove(id int64) {
	delete(ss.Scores, id)
}

func (ss *ScoreSet) Init(rule *NormalRule) {
	for _, score := range ss.Scores {
		score.Init(rule)
	}
	ss.CalcCompPoint(rule)
}

func (score *Score) Init(rule *NormalRule) {
	if score.Win == 0 && score.Lose == 0 {
		score.Point = rule.InitPoint
		score.Batsu = rule.InitBatsu
	}
}

func (ss *ScoreSet) CalcCompPoint(rule *NormalRule) {
	if !rule.Comprehensive.Active {
		return
	}
	for _, score := range ss.Scores {
		score.CalcCompPoint(rule)
	}
}

func (score *Score) CalcCompPoint(rule *NormalRule) {
	switch rule.Comprehensive.Calc {
	case "mul":
		score.CompPoint = score.Point * score.Batsu
	case "sub":
		score.CompPoint = score.Point - score.Batsu
	}
}

func (ss *ScoreSet) SetZero() {
	for _, score := range ss.Scores {
		score.SetZero()
	}
}

func (score *Score) SetZero() {
	score.Point = 0
	score.Batsu = 0
}

func (ss *ScoreSet) Merge(newSS *ScoreSet) {
	ss.Scores.Merge(newSS.Scores)
	ss.WinLose = newSS.WinLose.Clone()
}

func (scores Scores) Merge(newScores Scores) {
	for id, _ := range scores {
		if newScore, ok := newScores[id]; ok {
			scores[id] = newScore.Clone()
		} else {
			scores[id] = NewScore()
		}
	}
}

func (ss *ScoreSet) WalkScores(ids []int64, f func(score *Score)) {
	for _, id := range ids {
		if score, ok := ss.Scores[id]; ok {
			f(score)
		}
	}
}

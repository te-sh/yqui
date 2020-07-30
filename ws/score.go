package main

type ScoreGroup struct {
	Player *ScoreSet `json:"player"`
	Team   *ScoreSet `json:"team"`
}

type ScoreSet struct {
	Scores  Scores   `json:"scores"`
	WinLose *WinLose `json:"-"`
}

type Scores map[int64]*Score

type Score struct {
	Point    int  `json:"point"`
	Batsu    int  `json:"batsu"`
	Lock     int  `json:"lock"`
	Cons     int  `json:"cons"`
	PassSeat bool `json:"passSeat"`
	Win      int  `json:"win"`
	Lose     int  `json:"lose"`
}

func NewScoreGroup() *ScoreGroup {
	sg := new(ScoreGroup)
	sg.Player = NewScoreSet()
	sg.Team = NewScoreSet()
	return sg
}

func NewScoreSet() *ScoreSet {
	ss := new(ScoreSet)
	ss.Scores = make(Scores)
	ss.WinLose = NewWinLose()
	return ss
}

func NewScore() *Score {
	score := new(Score)
	score.Reset()
	return score
}

func (sg *ScoreGroup) Clone() *ScoreGroup {
	newSG := NewScoreGroup()
	newSG.Player = sg.Player.Clone()
	newSG.Team = sg.Team.Clone()
	return newSG
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

func (sg *ScoreGroup) Reset() {
	sg.Player.Reset()
	sg.Team.Reset()
}

func (ss *ScoreSet) Reset() {
	ss.Scores.Reset()
	ss.WinLose.Reset()
}

func (scores Scores) Reset() {
	for _, score := range scores {
		score.Reset()
	}
}

func (score *Score) Reset() {
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Cons = 0
	score.PassSeat = false
	score.Win = 0
	score.Lose = 0
}

func (ss *ScoreSet) Add(id int64) {
	ss.Scores[id] = NewScore()
}

func (ss *ScoreSet) Remove(id int64) {
	delete(ss.Scores, id)
}

func (sg *ScoreGroup) SetZero() {
	sg.Player.SetZero()
	sg.Team.SetZero()
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

func (sg *ScoreGroup) Merge(newSG *ScoreGroup) {
	sg.Player.Merge(newSG.Player)
	sg.Team.Merge(newSG.Team)
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

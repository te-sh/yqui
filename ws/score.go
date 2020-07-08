package main

type ScoreGroup struct {
	Player *ScoreSet
	Team *ScoreSet
}

type ScoreSet struct {
	Scores Scores
}

type Scores map[int64]*Score

type Score struct {
	Point int `json:"point"`
	Batsu int `json:"batsu"`
	Lock int `json:"lock"`
	Cons int `json:"cons"`
	Win int `json:"win"`
	Lose int `json:"lose"`
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
	return newSS
}

func (scores Scores) Clone() Scores {
	clone := make(Scores)
	for id, score := range scores {
		clone[id] = score.Clone()
	}
	return clone
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
	for _, score := range ss.Scores {
		score.Reset()
	}
}

func (score *Score) Reset() {
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Cons = 0
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
		score.Point = 0
		score.Batsu = 0
	}
}

func (sg *ScoreGroup) Merge(newSG *ScoreGroup) {
	sg.Player.Merge(newSG.Player)
	sg.Team.Merge(newSG.Team)
}

func (ss *ScoreSet) Merge(newSS *ScoreSet) {
	for id, _ := range newSS.Scores {
		if _, ok := ss.Scores[id]; ok {
			ss.Scores[id] = newSS.Scores[id].Clone()
		}
	}
}

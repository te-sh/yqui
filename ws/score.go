package main

type ScoreGroup struct {
	Player Scores
	Team Scores
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
	sg.Player = make(Scores)
	sg.Team = make(Scores)
	return sg
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

func (score *Score) Clone() *Score {
	newScore := *score
	return &newScore
}

func (scores Scores) Clone() Scores {
	clone := make(Scores)
	for id, score := range scores {
		clone[id] = score.Clone()
	}
	return clone
}

func (score *Score) Reset() {
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Cons = 0
	score.Win = 0
	score.Lose = 0
}

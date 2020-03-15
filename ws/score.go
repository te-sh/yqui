package main

type Score struct {
	Point int `json:"point"`
	Batsu int `json:"batsu"`
	Lock int `json:"lock"`
	Cons int `json:"cons"`
	Win int `json:"win"`
	Lose int `json:"lose"`
}

func NewScore() *Score {
	score := new(Score)
	score.Reset()
	return score
}

type Scores map[int64]*Score

func (score *Score) Clone() *Score {
	newScore := *score
	return &newScore
}

func (score *Score) Reset() {
	score.Point = 0
	score.Batsu = 0
	score.Lock = 0
	score.Cons = 0
	score.Win = 0
	score.Lose = 0
}

func (score *Score) CanPush() bool {
	return score.Lock == 0 && score.Win == 0 && score.Lose == 0
}

func (scores Scores) Clone() Scores {
	clone := make(Scores)
	for id, score := range scores {
		clone[id] = score.Clone()
	}
	return clone
}

func (scores Scores) Correct(id int64, rule *Rule, winLose *WinLose) (win bool) {
	score := scores[id]
	score.Point += rule.PointCorrect
	if (rule.BonusCorrect == "cons") {
		score.Point += score.Cons
		score.Cons += 1
		for otherId, otherScore := range scores {
			if otherId != id {
				otherScore.Cons = 0
			}
		}
	}
	win = rule.WinPoint.Active && score.Point >= rule.WinPoint.Value
	if win {
		winLose.WinNum += 1
		score.Win = winLose.WinNum
	}
	return
}

func (teamScores Scores) CorrectTeam(team *Team, scores Scores, rule *Rule, winLose *WinLose) {
	teamScore := teamScores[team.ID]
	switch (rule.TeamPoint) {
	case "sum":
		r := 0
		for _, id := range team.Players {
			r += scores[id].Point
		}
		teamScore.Point = r
	case "mul":
		r := 1
		for _, id := range team.Players {
			r *= scores[id].Point
		}
		teamScore.Point = r
	}
}

func (scores Scores) Wrong(id int64, rule *Rule, winLose *WinLose) (lose bool) {
	score := scores[id]
	score.Point += rule.PointWrong
	score.Batsu += rule.BatsuWrong
	score.Lock = rule.LockWrong
	if (rule.BonusCorrect == "cons") {
		score.Cons = 0
	}
	lose =
		(rule.LosePoint.Active && score.Point <= rule.LosePoint.Value) ||
		(rule.LoseBatsu.Active && score.Batsu >= rule.LoseBatsu.Value)
	if lose {
		winLose.LoseNum += 1
		score.Lose = winLose.LoseNum
	}
	return
}

func (teamScores Scores) WrongTeam(team *Team, scores Scores, rule *Rule, winLose *WinLose) {
	teamScore := teamScores[team.ID]
	switch (rule.TeamBatsu) {
	case "sum":
		r := 0
		for _, id := range team.Players {
			r += scores[id].Batsu
		}
		teamScore.Batsu = r
	}
}

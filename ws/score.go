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

func (scores Scores) SetCorrect(id int64, rule *Rule) {
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
}

func (scores Scores) SetWin(ids []int64, rule *Rule, winLose *WinLose) (win bool) {
	var wins []int64
	for _, id := range ids {
		score := scores[id]
		if rule.WinPoint.Active && score.Point >= rule.WinPoint.Value {
			wins = append(wins, id)
		}
	}
	win = len(wins) > 0
	if win {
		winLose.WinNum += 1
		for _, id := range wins {
			score := scores[id]
			score.Win = winLose.WinNum
		}
	}
	return
}

func (scores Scores) SetWrong(id int64, rule *Rule) {
	score := scores[id]
	score.Point += rule.PointWrong
	score.Batsu += rule.BatsuWrong
	score.Lock = rule.LockWrong
	if (rule.BonusCorrect == "cons") {
		score.Cons = 0
	}
	return
}

func (scores Scores) SetLose(ids []int64, rule *Rule, winLose *WinLose) (lose bool) {
	var loses []int64
	for _, id := range ids {
		score := scores[id]
		if ((rule.LosePoint.Active && score.Point <= rule.LosePoint.Value) ||
			(rule.LoseBatsu.Active && score.Batsu >= rule.LoseBatsu.Value)) {
			loses = append(loses, id)
		}
	}
	lose = len(loses) > 0
	if lose {
		winLose.LoseNum += 1
		for _, id := range loses {
			score := scores[id]
			score.Lose = winLose.LoseNum
		}
	}
	return
}

func (scores Scores) Correct(id int64, rule *Rule, winLose *WinLose) (win bool) {
	scores.SetCorrect(id, rule)
	win = scores.SetWin([]int64{id}, rule, winLose)
	return
}

func (scores Scores) Wrong(id int64, rule *Rule, winLose *WinLose) (lose bool) {
	scores.SetWrong(id, rule)
	lose = scores.SetLose([]int64{id}, rule, winLose)
	return
}

func (teamScores Scores) CalcTeam(team *Team, scores Scores, rule *Rule, winLose *WinLose) {
	if teamScore, ok := teamScores[team.ID]; ok {
		switch (rule.TeamPoint) {
		case "sum":
			p := 0
			for _, id := range team.Players {
				p += scores[id].Point
			}
			teamScore.Point = p
		case "mul":
			p := 1
			for _, id := range team.Players {
				p *= scores[id].Point
			}
			teamScore.Point = p
		}
		switch (rule.TeamBatsu) {
		case "sum":
			b := 0
			for _, id := range team.Players {
				b += scores[id].Batsu
			}
			teamScore.Batsu = b
		}
	}
}

func (scores Scores) CorrectBoard(ids []int64, first int64, rule *Rule, winLose *WinLose) (win bool) {
	for _, id := range ids {
		score := scores[id]
		score.Point += rule.BoardPointCorrect
		if rule.BoardApplyNormal && id == first {
			scores.SetCorrect(first, rule)
		}
	}
	win = scores.SetWin(ids, rule, winLose)
	return
}

func (scores Scores) WrongBoard(ids []int64, first int64, rule *Rule, winLose *WinLose) (lose bool) {
	for _, id := range ids {
		if rule.BoardApplyNormal && id == first {
			scores.SetWrong(first, rule)
		}
	}
	lose = scores.SetLose(ids, rule, winLose)
	return
}

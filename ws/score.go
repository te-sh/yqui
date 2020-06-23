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

func (scores Scores) SetWin(rule *Rule, winLose *WinLose) (win bool) {
	var wins []int64
	for id, score := range scores {
		if score.Win == 0 &&
			rule.WinPoint.Active && score.Point >= rule.WinPoint.Value {
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

func (teamScores Scores) SetTeamWin(rule *Rule, winLose *WinLose) (win bool) {
	var wins []int64
	for id, teamScore := range teamScores {
		if teamScore.Win == 0 &&
			rule.TeamWinPoint.Active && teamScore.Point >= rule.TeamWinPoint.Value {
			wins = append(wins, id)
		}
	}
	win = len(wins) > 0
	if win {
		winLose.TeamWinNum += 1
		for _, id := range wins {
			teamScore := teamScores[id]
			teamScore.Win = winLose.TeamWinNum
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

func (scores Scores) SetLose(rule *Rule, winLose *WinLose) (lose bool) {
	var loses []int64
	for id, score := range scores {
		if (score.Lose == 0 &&
			(rule.LosePoint.Active && score.Point <= rule.LosePoint.Value) ||
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

func (teamScores Scores) SetTeamLose(rule *Rule, winLose *WinLose) (lose bool) {
	var loses []int64
	for id, teamScore := range teamScores {
		if (teamScore.Lose == 0 &&
			(rule.TeamLosePoint.Active && teamScore.Point <= rule.TeamLosePoint.Value) ||
			(rule.TeamLoseBatsu.Active && teamScore.Batsu >= rule.TeamLoseBatsu.Value)) {
			loses = append(loses, id)
		}
	}
	lose = len(loses) > 0
	if lose {
		winLose.TeamLoseNum += 1
		for _, id := range loses {
			teamScore := teamScores[id]
			teamScore.Lose = winLose.TeamLoseNum
		}
	}
	return
}

func (scores Scores) Correct(id int64, rule *Rule, winLose *WinLose) (win bool) {
	scores.SetCorrect(id, rule)
	win = scores.SetWin(rule, winLose)
	return
}

func (scores Scores) Wrong(id int64, rule *Rule, winLose *WinLose) (lose bool) {
	scores.SetWrong(id, rule)
	lose = scores.SetLose(rule, winLose)
	return
}

func (teamScores Scores) CalcTeam(teams Teams, scores Scores, rule *Rule, winLose *WinLose) (win bool, lose bool) {
	for _, team := range teams {
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
	win = teamScores.SetTeamWin(rule, winLose)
	lose = teamScores.SetTeamLose(rule, winLose)
	return
}

func (scores Scores) CorrectBoard(ids []int64, first int64, rule *Rule, winLose *WinLose) (correct bool, win bool) {
	for _, id := range ids {
		score := scores[id]
		score.Point += rule.BoardPointCorrect
		if rule.BoardApplyNormal && id == first {
			scores.SetCorrect(first, rule)
			correct = true
		}
	}
	win = scores.SetWin(rule, winLose)
	return
}

func (scores Scores) WrongBoard(ids []int64, first int64, rule *Rule, winLose *WinLose) (wrong bool, lose bool) {
	for _, id := range ids {
		if rule.BoardApplyNormal && id == first {
			scores.SetWrong(first, rule)
			wrong = true
		}
	}
	lose = scores.SetLose(rule, winLose)
	return
}

package main

func (scores Scores) CanPush(id int64) bool {
	if score, ok := scores[id]; ok {
		return score.Lock == 0 && score.Win == 0 && score.Lose == 0
	} else {
		return false
	}
}

func (scores Scores) SetCorrect(id int64, rule *Rule) {
	if score, ok := scores[id]; ok {
		score.Point += rule.Player.PointCorrect
		if (rule.Player.BonusCorrect == "cons") {
			score.Point += score.Cons
			score.Cons += 1
			for otherId, otherScore := range scores {
				if otherId != id {
					otherScore.Cons = 0
				}
			}
		}
	}
}

func (scores Scores) SetWin(rule WinLoseRule, winLose *WinLoseInfo) (win bool) {
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

func (scores Scores) SetWrong(id int64, rule *Rule) {
	if score, ok := scores[id]; ok {
		score.Point += rule.Player.PointWrong
		score.Batsu += rule.Player.BatsuWrong
		score.Lock = rule.Player.LockWrong
		if (rule.Player.BonusCorrect == "cons") {
			score.Cons = 0
		}
	}
}

func (scores Scores) SetLose(rule WinLoseRule, winLose *WinLoseInfo) (lose bool) {
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

func (scores Scores) Correct(id int64, rule *Rule, winLose *WinLose, sound *Sound) {
	scores.SetCorrect(id, rule)
	sound.Win = scores.SetWin(rule.Player.WinLoseRule, winLose.Player)
	return
}

func (scores Scores) Wrong(id int64, rule *Rule, winLose *WinLose, sound *Sound) {
	scores.SetWrong(id, rule)
	sound.Lose = scores.SetLose(rule.Player.WinLoseRule, winLose.Player)
	return
}

func (teamScores Scores) CalcTeam(teams Teams, scores Scores, rule *Rule, winLose *WinLose, sound *Sound) {
	if !rule.Team.Active {
		return
	}
	for _, team := range teams {
		if teamScore, ok := teamScores[team.ID]; ok {
			switch (rule.Team.Point) {
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
			switch (rule.Team.Batsu) {
			case "sum":
				b := 0
				for _, id := range team.Players {
					b += scores[id].Batsu
				}
				teamScore.Batsu = b
			}
			if (rule.Team.ShareLock) {
				l := 0
				for _, id := range team.Players {
					if l < scores[id].Lock {
						l = scores[id].Lock
					}
				}
				teamScore.Lock = l
			}
		}
	}
	if sound != nil {
		sound.Win = sound.Win || teamScores.SetWin(rule.Team.WinLoseRule, winLose.Team)
		sound.Lose = sound.Lose || teamScores.SetLose(rule.Team.WinLoseRule, winLose.Team)
	}
	return
}

func (scores Scores) CorrectBoard(ids []int64, first int64, rule *Rule, winLose *WinLose, sound *Sound) {
	for _, id := range ids {
		score := scores[id]
		score.Point += rule.Board.PointCorrect
		if rule.Board.ApplyNormal && id == first {
			scores.SetCorrect(first, rule)
			sound.Correct = true
		}
	}
	sound.Win = scores.SetWin(rule.Player.WinLoseRule, winLose.Player)
	return
}

func (scores Scores) WrongBoard(ids []int64, first int64, rule *Rule, winLose *WinLose, sound *Sound) {
	for _, id := range ids {
		if rule.Board.ApplyNormal && id == first {
			scores.SetWrong(first, rule)
			sound.Wrong = true
		}
	}
	sound.Lose = scores.SetLose(rule.Player.WinLoseRule, winLose.Player)
	return
}

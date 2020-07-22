package main

func (ss *ScoreSet) CanPush(id int64) bool {
	if score, ok := ss.Scores[id]; ok {
		return score.Lock == 0 && score.Win == 0 && score.Lose == 0
	} else {
		return false
	}
}

func (ss *ScoreSet) SetCorrect(id int64, rule *Rule) {
	if score, ok := ss.Scores[id]; ok {
		score.Point += rule.Player.PointCorrect
		if rule.Player.BonusCorrect == "cons" {
			score.Point += score.Cons
			score.Cons += 1
			for otherId, otherScore := range ss.Scores {
				if otherId != id {
					otherScore.Cons = 0
				}
			}
		}
	}
}

func (ss *ScoreSet) SetWin(rule WinLoseRule) (win bool) {
	var wins []int64
	for id, score := range ss.Scores {
		if score.Win == 0 &&
			rule.WinPoint.Active && score.Point >= rule.WinPoint.Value {
			wins = append(wins, id)
		}
	}
	win = len(wins) > 0
	if win {
		ss.WinLose.WinNum += 1
		for _, id := range wins {
			score := ss.Scores[id]
			score.Win = ss.WinLose.WinNum
		}
	}
	return
}

func (ss *ScoreSet) SetWrong(id int64, rule *Rule) {
	if score, ok := ss.Scores[id]; ok {
		score.Point += rule.Player.PointWrong
		score.Batsu += rule.Player.BatsuWrong
		score.Lock = rule.Player.LockWrong
		if rule.Player.BonusCorrect == "cons" {
			score.Cons = 0
		}
	}
}

func (ss *ScoreSet) SetLose(rule WinLoseRule) (lose bool) {
	var loses []int64
	for id, score := range ss.Scores {
		if score.Lose == 0 &&
			(rule.LosePoint.Active && score.Point <= rule.LosePoint.Value) ||
			(rule.LoseBatsu.Active && score.Batsu >= rule.LoseBatsu.Value) {
			loses = append(loses, id)
		}
	}
	lose = len(loses) > 0
	if lose {
		ss.WinLose.LoseNum += 1
		for _, id := range loses {
			score := ss.Scores[id]
			score.Lose = ss.WinLose.LoseNum
		}
	}
	return
}

func (ss *ScoreSet) Correct(id int64, rule *Rule, sound *Sound) {
	ss.SetCorrect(id, rule)
	sound.Win = ss.SetWin(rule.Player.WinLoseRule)
}

func (ss *ScoreSet) Wrong(id int64, rule *Rule, sound *Sound) {
	ss.SetWrong(id, rule)
	sound.Lose = ss.SetLose(rule.Player.WinLoseRule)
}

func (ss *ScoreSet) DecreaseLock(buttons *Buttons) {
	for id, score := range ss.Scores {
		if !buttons.Answered(id) && score.Lock > 0 {
			score.Lock -= 1
		}
	}
}

func (ss *ScoreSet) SetTeam(teams Teams) {
	newScores := make(Scores)
	for _, team := range teams {
		if score, ok := ss.Scores[team.ID]; ok {
			newScores[team.ID] = score
		} else {
			newScores[team.ID] = NewScore()
		}
	}
	ss.Scores = newScores
}

func (ss *ScoreSet) CalcTeam(teams Teams, playerSS *ScoreSet, rule *Rule, sound *Sound) {
	if !rule.Team.Active {
		return
	}
	for _, team := range teams {
		if teamScore, ok := ss.Scores[team.ID]; ok {
			switch rule.Team.Point {
			case "sum":
				p := 0
				for _, id := range team.Players {
					p += playerSS.Scores[id].Point
				}
				teamScore.Point = p
			case "mul":
				p := 1
				for _, id := range team.Players {
					p *= playerSS.Scores[id].Point
				}
				teamScore.Point = p
			}
			switch rule.Team.Batsu {
			case "sum":
				b := 0
				for _, id := range team.Players {
					b += playerSS.Scores[id].Batsu
				}
				teamScore.Batsu = b
			}
			if rule.Team.ShareLock {
				l := 0
				for _, id := range team.Players {
					if l < playerSS.Scores[id].Lock {
						l = playerSS.Scores[id].Lock
					}
				}
				teamScore.Lock = l
			}
		}
	}
	if sound != nil {
		sound.Win = sound.Win || ss.SetWin(rule.Team.WinLoseRule)
		sound.Lose = sound.Lose || ss.SetLose(rule.Team.WinLoseRule)
	}
}

func (ss *ScoreSet) CorrectBoard(ids []int64, first int64, rule *Rule, sound *Sound) {
	for _, id := range ids {
		score := ss.Scores[id]
		score.Point += rule.Board.PointCorrect
		if rule.Board.ApplyNormal && id == first {
			ss.SetCorrect(first, rule)
			sound.Correct = true
		}
	}
	sound.Win = ss.SetWin(rule.Player.WinLoseRule)
}

func (ss *ScoreSet) WrongBoard(ids []int64, first int64, rule *Rule, sound *Sound) {
	for _, id := range ids {
		if rule.Board.ApplyNormal && id == first {
			ss.SetWrong(first, rule)
			sound.Wrong = true
		}
	}
	sound.Lose = ss.SetLose(rule.Player.WinLoseRule)
}

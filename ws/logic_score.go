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
		if rule.Player.SpecialCorrect.ConsBonus {
			score.Point += rule.Player.PointCorrect * score.ConsCorrect
			score.ConsCorrect += 1
			for otherId, otherScore := range ss.Scores {
				if otherId != id {
					otherScore.ConsCorrect = 0
				}
			}
		}
		if rule.Player.SpecialCorrect.Survival.Active {
			for otherId, otherScore := range ss.Scores {
				if otherId != id && otherScore.Win != 0 && otherScore.Lose != 0 {
					otherScore.Point += rule.Player.SpecialCorrect.Survival.Value
				}
			}
		}
		if rule.Other.PassQuiz {
			if score.ExceedWinPoint(rule.Player.WinLoseRule, rule.Player.Comprehensive) {
				score.PassSeat = !score.PassSeat
			}
			for otherId, otherScore := range ss.Scores {
				if otherId != id && otherScore.PassSeat {
					otherScore.Point = rule.Player.InitPoint
					otherScore.PassSeat = false
				}
			}
		}
	}
	ss.CalcCompPoint(rule.Player)
}

func (ss *ScoreSet) SetWrong(id int64, rule *Rule) {
	if score, ok := ss.Scores[id]; ok {
		if rule.Player.SpecialWrong.Updown {
			score.Point = rule.Player.InitPoint
		} else if rule.Other.PassQuiz && score.PassSeat {
			score.Point = rule.Player.InitPoint
			score.PassSeat = false
		} else {
			score.Point += rule.Player.PointWrong
		}
		if rule.Player.SpecialWrong.Swedish {
			for i := 1; i <= score.Point+1; i++ {
				if score.Point < i*(i+1)/2 {
					score.Batsu += i
					break
				}
			}
		} else {
			score.Batsu += rule.Player.BatsuWrong
		}
		if rule.Player.SpecialWrong.Backstream {
			score.Point -= score.Batsu
		}
		if rule.Player.SpecialWrong.Divide && score.Batsu != 0 {
			score.Point /= score.Batsu
		}
		score.Lock = rule.Player.LockWrong
		if rule.Player.SpecialWrong.BelowLock && score.Point < rule.Player.InitPoint {
			score.Lock += rule.Player.InitPoint - score.Point
			score.Point = rule.Player.InitPoint
		}
		if rule.Player.SpecialCorrect.ConsBonus {
			score.ConsCorrect = 0
		}
	}
	ss.CalcCompPoint(rule.Player)
}

func (ss *ScoreSet) Correct(id int64, rule *Rule, sound *Sound) {
	ss.SetCorrect(id, rule)
	sound.Win = ss.SetWin(rule.Player.WinLoseRule, rule.Player.Comprehensive)
	sound.Lose = ss.SetLose(rule.Player.WinLoseRule)
}

func (ss *ScoreSet) Wrong(id int64, rule *Rule, sound *Sound) {
	ss.SetWrong(id, rule)
	sound.Win = ss.SetWin(rule.Player.WinLoseRule, rule.Player.Comprehensive)
	sound.Lose = ss.SetLose(rule.Player.WinLoseRule)
}

func (ss *ScoreSet) DecreaseLock(buttons *Buttons) {
	for id, score := range ss.Scores {
		if !buttons.Answered(id) && score.Lock > 0 {
			score.Lock -= 1
		}
	}
}

func (ss *ScoreSet) SetTeams(teams Teams) {
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

func (ss *ScoreSet) CalcTeams(teams Teams, playerSS *ScoreSet, rule *Rule, sound *Sound) {
	if !rule.Team.Active {
		return
	}
	for _, team := range teams {
		if teamScore, ok := ss.Scores[team.ID]; ok {
			switch rule.Team.Point {
			case "sum":
				p := 0
				playerSS.WalkScores(team.Players, func(score *Score) { p += score.Point })
				teamScore.Point = p
			case "mul":
				p := 1
				playerSS.WalkScores(team.Players, func(score *Score) { p *= score.Point })
				teamScore.Point = p
			}
			switch rule.Team.Batsu {
			case "sum":
				b := 0
				playerSS.WalkScores(team.Players, func(score *Score) { b += score.Batsu })
				teamScore.Batsu = b
			}
			if rule.Team.ShareLock {
				l := 0
				playerSS.WalkScores(team.Players, func(score *Score) { l = IntMax(l, score.Lock) })
				teamScore.Lock = l
			}
		}
	}
	if sound != nil {
		sound.Win = ss.SetWin(rule.Team.WinLoseRule, nil) || sound.Win
		sound.Lose = ss.SetLose(rule.Team.WinLoseRule) || sound.Lose
	}
}

func (ss *ScoreSet) CorrectBoard(ids []int64, first int64, rule *Rule, sound *Sound) {
	for _, id := range ids {
		if score, ok := ss.Scores[id]; ok {
			score.Point += rule.Board.PointCorrect
		}
		if rule.Board.ApplyNormal && id == first {
			ss.SetCorrect(first, rule)
			sound.Correct = true
		}
	}
	sound.Win = ss.SetWin(rule.Player.WinLoseRule, rule.Player.Comprehensive)
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

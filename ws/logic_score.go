package main

func (ss *ScoreSet) CanPush(id int64) bool {
	if score, ok := ss.Scores[id]; ok {
		return score.Lock == 0 && score.Win == 0 && score.Lose == 0
	} else {
		return false
	}
}

func (score *Score) ExceedWinPoint(rule WinLoseRule) bool {
	if score.Win != 0 {
		return false
	}
	if rule.WinPoint.Active {
		if rule.WinPoint.Above && score.Point >= rule.WinPoint.Value ||
			!rule.WinPoint.Above && score.Point <= rule.WinPoint.Value {
			return true
		}
	}
	return false
}

func (ss *ScoreSet) SetCorrect(id int64, rule *Rule) {
	if score, ok := ss.Scores[id]; ok {
		score.Point += rule.Player.PointCorrect
		if rule.Player.SpecialCorrect.ConsBonus {
			score.Point += score.Cons
			score.Cons += 1
			for otherId, otherScore := range ss.Scores {
				if otherId != id {
					otherScore.Cons = 0
				}
			}
		}
		if rule.Other.PassQuiz {
			for otherId, otherScore := range ss.Scores {
				if otherId != id && otherScore.PassSeat {
					otherScore.Point = 0
					otherScore.PassSeat = false
				}
			}
		}
	}
	ss.CalcCompPoint(rule.Player)
}

func (ss *ScoreSet) SetWin(rule WinLoseRule, passQuiz bool) (win bool) {
	var wins []*Score
	for _, score := range ss.Scores {
		if score.ExceedWinPoint(rule) {
			if !passQuiz || score.PassSeat {
				wins = append(wins, score)
			} else {
				score.PassSeat = true
			}
		}
	}
	win = len(wins) > 0
	if win {
		ss.WinLose.WinNum += 1
		for _, score := range wins {
			score.Win = ss.WinLose.WinNum
		}
	}
	return
}

func (score *Score) ExceedLosePoint(rule WinLoseRule) bool {
	if score.Lose != 0 {
		return false
	}
	if rule.LosePoint.Active {
		if rule.LosePoint.Above && score.Point >= rule.LosePoint.Value ||
			!rule.LosePoint.Above && score.Point <= rule.LosePoint.Value {
			return true
		}
	}
	if rule.LoseBatsu.Active {
		if rule.LoseBatsu.Above && score.Batsu >= rule.LoseBatsu.Value ||
			!rule.LoseBatsu.Above && score.Batsu <= rule.LoseBatsu.Value {
			return true
		}
	}
	return false
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
		if rule.Player.SpecialWrong.Divide && score.Batsu != 0 {
			score.Point /= score.Batsu
		}
		score.Lock = rule.Player.LockWrong
		if rule.Player.SpecialCorrect.ConsBonus {
			score.Cons = 0
		}
	}
	ss.CalcCompPoint(rule.Player)
}

func (ss *ScoreSet) SetLose(rule WinLoseRule) (lose bool) {
	var loses []*Score
	for _, score := range ss.Scores {
		if score.ExceedLosePoint(rule) {
			loses = append(loses, score)
		}
	}
	lose = len(loses) > 0
	if lose {
		ss.WinLose.LoseNum += 1
		for _, score := range loses {
			score.Lose = ss.WinLose.LoseNum
		}
	}
	return
}

func (ss *ScoreSet) Correct(id int64, rule *Rule, sound *Sound) {
	ss.SetCorrect(id, rule)
	sound.Win = ss.SetWin(rule.Player.WinLoseRule, rule.Other.PassQuiz)
}

func (ss *ScoreSet) Wrong(id int64, rule *Rule, sound *Sound) {
	ss.SetWrong(id, rule)
	sound.Lose = ss.SetLose(rule.Player.WinLoseRule)
}

func (ss *ScoreSet) WinTop(sound *Sound) {
	alive := false
	max := 0
	for _, score := range ss.Scores {
		if score.Win == 0 && score.Lose == 0 {
			alive = true
			max = score.Point
		}
	}
	if !alive {
		return
	}
	sound.Win = true
	for _, score := range ss.Scores {
		if score.Win == 0 && score.Lose == 0 {
			if max < score.Point {
				max = score.Point
			}
		}
	}
	ss.WinLose.WinNum += 1
	for _, score := range ss.Scores {
		if score.Win == 0 && score.Lose == 0 && score.Point == max {
			score.Win = ss.WinLose.WinNum
		}
	}
}

func (ss *ScoreSet) LoseBottom(sound *Sound) {
	alive := false
	min := 0
	for _, score := range ss.Scores {
		if score.Win == 0 && score.Lose == 0 {
			alive = true
			min = score.Point
		}
	}
	if !alive {
		return
	}
	sound.Lose = true
	for _, score := range ss.Scores {
		if score.Win == 0 && score.Lose == 0 {
			if min > score.Point {
				min = score.Point
			}
		}
	}
	ss.WinLose.LoseNum += 1
	for _, score := range ss.Scores {
		if score.Win == 0 && score.Lose == 0 && score.Point == min {
			score.Lose = ss.WinLose.LoseNum
		}
	}
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
		sound.Win = sound.Win || ss.SetWin(rule.Team.WinLoseRule, false)
		sound.Lose = sound.Lose || ss.SetLose(rule.Team.WinLoseRule)
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
	sound.Win = ss.SetWin(rule.Player.WinLoseRule, rule.Other.PassQuiz)
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

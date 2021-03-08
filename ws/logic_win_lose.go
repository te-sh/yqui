package main

func (score *Score) ExceedWinPoint(rule WinLoseRule, comprehensive *ComprehensiveRule) bool {
	if score.Win != 0 {
		return false
	}
	if rule.WinPoint.Active {
		if rule.WinPoint.Above && score.Point >= rule.WinPoint.Value ||
			!rule.WinPoint.Above && score.Point <= rule.WinPoint.Value {
			return true
		}
	}
	if comprehensive != nil && comprehensive.Active && comprehensive.WinPoint.Active {
		if comprehensive.WinPoint.Above && score.CompPoint >= comprehensive.WinPoint.Value ||
			!comprehensive.WinPoint.Above && score.CompPoint <= comprehensive.WinPoint.Value {
			return true
		}
	}
	return false
}

func (ss *ScoreSet) SetWin(rule WinLoseRule, comprehensive *ComprehensiveRule) (win bool) {
	var wins []*Score
	for _, score := range ss.Scores {
		if score.ExceedWinPoint(rule, comprehensive) {
			if !score.PassSeat {
				wins = append(wins, score)
			}
		}
	}
	win = len(wins) > 0
	if win {
		ss.WinLose.WinNum += 1
		for _, score := range wins {
			score.Win = ss.WinLose.WinNum
			score.Lock = 0
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
			score.Lock = 0
		}
	}
	return
}

func (ss *ScoreSet) WinTop(sound *Sound) {
	alive, max := false, 0
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
			score.Lock = 0
		}
	}
}

func (ss *ScoreSet) LoseBottom(sound *Sound) {
	alive, min := false, 0
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
			score.Lock = 0
		}
	}
}

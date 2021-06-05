package main

import (
	"sort"
)

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
		for _, score := range wins {
			score.Win = ss.WinLose.WinNum
			score.Lock = 0
		}
		ss.WinLose.WinNum += len(wins)
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

func (ss *ScoreSet) WinTop(ids []int64, rule *OtherRule, sound *Sound) {
	scores := ss.MakeScoresForSort(ids)
	if len(scores) == 0 {
		return
	}
	sound.Win = true

	t := len(scores)
	switch rule.WinLoseOrder {
	case "point":
		sort.Slice(scores, func(i, j int) bool {
			return scores[i].Point > scores[j].Point
		})
		for i, score := range scores {
			if score.Point != scores[0].Point {
				t = i
				break
			}
		}
	case "point-and-batsu":
		sort.Slice(scores, func(i, j int) bool {
			if scores[i].Point == scores[j].Point {
				return scores[i].Batsu < scores[j].Batsu
			} else {
				return scores[i].Point > scores[j].Point
			}
		})
		for i, score := range scores {
			if score.Point != scores[0].Point || score.Batsu != scores[0].Batsu {
				t = i
				break
			}
		}
	case "comp-point":
		sort.Slice(scores, func(i, j int) bool {
			return scores[i].CompPoint > scores[j].CompPoint
		})
		for i, score := range scores {
			if score.CompPoint != scores[0].CompPoint {
				t = i
				break
			}
		}
	case "comp-point-and-point":
		sort.Slice(scores, func(i, j int) bool {
			if scores[i].CompPoint == scores[j].CompPoint {
				return scores[i].Point > scores[j].Point
			} else {
				return scores[i].CompPoint > scores[j].CompPoint
			}
		})
		for i, score := range scores {
			if score.CompPoint != scores[0].CompPoint || score.Point != scores[0].Point {
				t = i
				break
			}
		}
	}

	for i := 0; i < t; i++ {
		scores[i].Win = ss.WinLose.WinNum
	}
	ss.WinLose.WinNum += t
}

func (ss *ScoreSet) LoseBottom(ids []int64, rule *OtherRule, sound *Sound) {
	scores := ss.MakeScoresForSort(ids)
	if len(scores) == 0 {
		return
	}
	sound.Lose = true

	t := len(scores)
	switch rule.WinLoseOrder {
	case "point":
		sort.Slice(scores, func(i, j int) bool {
			return scores[i].Point < scores[j].Point
		})
		for i, score := range scores {
			if score.Point != scores[0].Point {
				t = i
				break
			}
		}
	case "point-and-batsu":
		sort.Slice(scores, func(i, j int) bool {
			if scores[i].Point == scores[j].Point {
				return scores[i].Batsu > scores[j].Batsu
			} else {
				return scores[i].Point < scores[j].Point
			}
		})
		for i, score := range scores {
			if score.Point != scores[0].Point || score.Batsu != scores[0].Batsu {
				t = i
				break
			}
		}
	case "comp-point":
		sort.Slice(scores, func(i, j int) bool {
			return scores[i].CompPoint < scores[j].CompPoint
		})
		for i, score := range scores {
			if score.CompPoint != scores[0].CompPoint {
				t = i
				break
			}
		}
	case "comp-point-and-point":
		sort.Slice(scores, func(i, j int) bool {
			if scores[i].CompPoint == scores[j].CompPoint {
				return scores[i].Point < scores[j].Point
			} else {
				return scores[i].CompPoint < scores[j].CompPoint
			}
		})
		for i, score := range scores {
			if score.CompPoint != scores[0].CompPoint || score.Point != scores[0].Point {
				t = i
				break
			}
		}
	}

	for i := 0; i < t; i++ {
		scores[i].Lose = ss.WinLose.LoseNum
	}
	ss.WinLose.LoseNum += t
}

func (ss *ScoreSet) MakeScoresForSort(ids []int64) ([]*Score) {
	var scores []*Score
	for _, id := range ids {
		if score, ok := ss.Scores[id]; ok {
			if score.Win == 0 && score.Lose == 0 {
				scores = append(scores, score)
			}
		}
	}
	return scores
}

package main

type ScoreGroup struct {
	Player *ScoreSet
	Team *ScoreSet
}

type ScoreSet struct {
	Scores Scores `json:"scores"`
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

func NewScoreSet() *ScoreSet {
	scoreSet := new(ScoreSet)
	scoreSet.Scores = make(Scores)
	return scoreSet
}

func NewScore() *Score {
	score := new(Score)
	score.Reset()
	return score
}

func (scoreSet ScoreSet) Clone() *ScoreSet {
	newScoreSet := NewScoreSet()
	newScoreSet.Scores = scoreSet.Scores.Clone()
	return newScoreSet
}

func (scores Scores) Clone() Scores {
	newScores := make(Scores)
	for id, score := range scores {
		newScores[id] = score.Clone()
	}
	return newScores
}

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

func (scores Scores) SetCorrect(id int64, rule *Rule) {
	score := scores[id]
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

func (scoreSet ScoreSet) SetWin(rule WinLoseRule, winLose *WinLose) (win bool) {
	var wins []int64
	for id, score := range scoreSet.Scores {
		if score.Win == 0 &&
			rule.WinPoint.Active && score.Point >= rule.WinPoint.Value {
			wins = append(wins, id)
		}
	}
	win = len(wins) > 0
	if win {
		winLose.WinNum += 1
		for _, id := range wins {
			score := scoreSet.Scores[id]
			score.Win = winLose.WinNum
		}
	}
	return
}

func (scores Scores) SetWrong(id int64, rule *Rule) {
	score := scores[id]
	score.Point += rule.Player.PointWrong
	score.Batsu += rule.Player.BatsuWrong
	score.Lock = rule.Player.LockWrong
	if (rule.Player.BonusCorrect == "cons") {
		score.Cons = 0
	}
}

func (scoreSet ScoreSet) SetLose(rule WinLoseRule, winLose *WinLose) (lose bool) {
	var loses []int64
	for id, score := range scoreSet.Scores {
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
			score := scoreSet.Scores[id]
			score.Lose = winLose.LoseNum
		}
	}
	return
}

func (scoreSet ScoreSet) Correct(id int64, rule *Rule, winLose *WinLose, sound *Sound) {
	scoreSet.Scores.SetCorrect(id, rule)
	sound.Win = scoreSet.SetWin(rule.Player.WinLoseRule, winLose)
}

func (scoreSet ScoreSet) Wrong(id int64, rule *Rule, winLose *WinLose, sound *Sound) {
	scoreSet.Scores.SetWrong(id, rule)
	sound.Lose = scoreSet.SetLose(rule.Player.WinLoseRule, winLose)
}

func (teamScoreSet ScoreSet) CalcTeam(teams Teams, scores Scores, rule *Rule, winLose *WinLose, sound *Sound) {
	if !rule.Team.Active {
		return
	}
	for _, team := range teams {
		if teamScore, ok := teamScoreSet.Scores[team.ID]; ok {
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
		sound.Win = sound.Win || teamScoreSet.SetWin(rule.Team.WinLoseRule, winLose)
		sound.Lose = sound.Lose || teamScoreSet.SetLose(rule.Team.WinLoseRule, winLose)
	}
}

func (scoreSet ScoreSet) CorrectBoard(ids []int64, first int64, rule *Rule, winLose *WinLose, sound *Sound) {
	for _, id := range ids {
		score := scoreSet.Scores[id]
		score.Point += rule.Board.PointCorrect
		if rule.Board.ApplyNormal && id == first {
			scoreSet.Scores.SetCorrect(first, rule)
			sound.Correct = true
		}
	}
	sound.Win = scoreSet.SetWin(rule.Player.WinLoseRule, winLose)
}

func (scoreSet ScoreSet) WrongBoard(ids []int64, first int64, rule *Rule, winLose *WinLose, sound *Sound) {
	for _, id := range ids {
		if rule.Board.ApplyNormal && id == first {
			scoreSet.Scores.SetWrong(first, rule)
			sound.Wrong = true
		}
	}
	sound.Lose = scoreSet.SetLose(rule.Player.WinLoseRule, winLose)
}

package main

type History struct {
	Items []*HistoryItem
	Curr int
}

type HistoryItem struct {
	ScoreSet *ScoreSet
	TeamScoreSet *ScoreSet
	WinLoseSet *WinLoseSet
}

const HistoryMaxLen = 100

func NewHistory() *History {
	history := new(History)
	history.Items = append(history.Items, NewHistoryItem())
	history.Curr = 0
	return history
}

func NewHistoryItem() *HistoryItem {
	item := new(HistoryItem)
	item.ScoreSet = NewScoreSet()
	item.TeamScoreSet = NewScoreSet()
	item.WinLoseSet = NewWinLoseSet()
	return item
}


func (history *History) AddHistory(scoreSet *ScoreSet, teamScoreSet *ScoreSet, winLoseSet *WinLoseSet) {
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	item.ScoreSet = scoreSet.Clone()
	item.TeamScoreSet = teamScoreSet.Clone()
	item.WinLoseSet = winLoseSet.Clone()

	history.Items = append(history.Items, item)
	history.Curr += 1

	if len(history.Items) > HistoryMaxLen {
		history.Curr -= len(history.Items) - HistoryMaxLen
		history.Items = history.Items[len(history.Items) - HistoryMaxLen:]
	}
}

func (history *History) MoveHistory(d int, scoreSet *ScoreSet, teamScoreSet *ScoreSet, winLoseSet *WinLoseSet) {
	i := history.Curr + d
	if i < 0 || i >= len(history.Items) {
		return
	}

	item := history.Items[i]
	for id := range item.ScoreSet.Scores {
		if _, ok := scoreSet.Scores[id]; ok {
			scoreSet.Scores[id] = item.ScoreSet.Scores[id].Clone()
		}
	}
	for id := range item.TeamScoreSet.Scores {
		if _, ok := teamScoreSet.Scores[id]; ok {
			teamScoreSet.Scores[id] = item.TeamScoreSet.Scores[id].Clone()
		}
	}
	winLoseSet = item.WinLoseSet.Clone()

	history.Curr = i
}

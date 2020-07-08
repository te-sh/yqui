package main

type History struct {
	Items []*HistoryItem
	Curr int
}

type HistoryItem struct {
	Scores Scores
	TeamScores Scores
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
	item.Scores = make(Scores)
	item.TeamScores = make(Scores)
	item.WinLoseSet = NewWinLoseSet()
	return item
}


func (history *History) AddHistory(scores Scores, teamScores Scores, winLoseSet *WinLoseSet) {
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	item.Scores = scores.Clone()
	item.TeamScores = teamScores.Clone()
	item.WinLoseSet = winLoseSet.Clone()

	history.Items = append(history.Items, item)
	history.Curr += 1

	if len(history.Items) > HistoryMaxLen {
		history.Curr -= len(history.Items) - HistoryMaxLen
		history.Items = history.Items[len(history.Items) - HistoryMaxLen:]
	}
}

func (history *History) MoveHistory(d int, scores Scores, teamScores Scores, winLoseSet *WinLoseSet) {
	i := history.Curr + d
	if i < 0 || i >= len(history.Items) {
		return
	}

	item := history.Items[i]
	for id := range item.Scores {
		if _, ok := scores[id]; ok {
			scores[id] = item.Scores[id].Clone()
		}
	}
	for id := range item.TeamScores {
		if _, ok := teamScores[id]; ok {
			teamScores[id] = item.TeamScores[id].Clone()
		}
	}
	winLoseSet = item.WinLoseSet.Clone()

	history.Curr = i
}

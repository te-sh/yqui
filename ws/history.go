package main

type History struct {
	Items []*HistoryItem
	Curr int
}

type HistoryItem struct {
	SG *ScoreGroup
	WinLose *WinLose
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
	item.SG = NewScoreGroup()
	item.WinLose = NewWinLose()
	return item
}


func (history *History) AddHistory(sg *ScoreGroup, winLose *WinLose) {
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	item.SG = sg.Clone()
	item.WinLose = winLose.Clone()

	history.Items = append(history.Items, item)
	history.Curr += 1

	if len(history.Items) > HistoryMaxLen {
		history.Curr -= len(history.Items) - HistoryMaxLen
		history.Items = history.Items[len(history.Items) - HistoryMaxLen:]
	}
}

func (history *History) MoveHistory(d int, sg *ScoreGroup, winLose *WinLose) {
	i := history.Curr + d
	if i < 0 || i >= len(history.Items) {
		return
	}

	item := history.Items[i]
	for id := range item.SG.Player {
		if _, ok := sg.Player[id]; ok {
			sg.Player[id] = item.SG.Player[id].Clone()
		}
	}
	for id := range item.SG.Team {
		if _, ok := sg.Team[id]; ok {
			sg.Team[id] = item.SG.Team[id].Clone()
		}
	}
	winLose = item.WinLose.Clone()

	history.Curr = i
}

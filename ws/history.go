package main

type History struct {
	Items []*HistoryItem
	Curr int
}

type HistoryItem struct {
	SG *ScoreGroup
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
	return item
}


func (history *History) AddHistory(sg *ScoreGroup) {
	history.Items = history.Items[:history.Curr + 1]

	item := NewHistoryItem()
	item.SG = sg.Clone()

	history.Items = append(history.Items, item)
	history.Curr += 1

	if len(history.Items) > HistoryMaxLen {
		history.Curr -= len(history.Items) - HistoryMaxLen
		history.Items = history.Items[len(history.Items) - HistoryMaxLen:]
	}
}

func (history *History) MoveHistory(d int, sg *ScoreGroup) {
	i := history.Curr + d
	if i < 0 || i >= len(history.Items) {
		return
	}

	item := history.Items[i]
	sg.Merge(item.SG)

	history.Curr = i
}

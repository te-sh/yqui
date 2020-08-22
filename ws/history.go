package main

type History struct {
	Items    []*HistoryItem
	Curr     int
	NeedSave bool
}

type HistoryItem struct {
	SG      *ScoreGroup
	Buttons *Buttons
}

const HistoryMaxLen = 100

func NewHistory() *History {
	history := new(History)
	history.Items = append(history.Items, NewHistoryItem())
	history.Curr = 0
	history.NeedSave = false
	return history
}

func NewHistoryItem() *HistoryItem {
	item := new(HistoryItem)
	item.SG = NewScoreGroup()
	item.Buttons = NewButtons()
	return item
}

func (history *History) Join(id int64) {
	for _, item := range history.Items {
		item.SG.Player.Add(id)
	}
}

func (history *History) Leave(id int64) {
	for _, item := range history.Items {
		item.SG.Player.Remove(id)
		item.Buttons.Remove(id)
	}
}

func (history *History) Save(sg *ScoreGroup, buttons *Buttons) {
	if history.NeedSave {
		history.Add(sg, buttons)
	}
}

func (history *History) Add(sg *ScoreGroup, buttons *Buttons) {
	history.Items = history.Items[:history.Curr+1]

	item := NewHistoryItem()
	item.SG = sg.Clone()
	item.Buttons = buttons.Clone()

	history.Items = append(history.Items, item)
	history.Curr += 1
	history.NeedSave = false

	if len(history.Items) > HistoryMaxLen {
		history.Curr -= len(history.Items) - HistoryMaxLen
		history.Items = history.Items[len(history.Items)-HistoryMaxLen:]
	}
}

func (history *History) Move(d int, sg *ScoreGroup, buttons *Buttons) {
	if history.NeedSave {
		if d < 0 {
			d += 1
		} else {
			return
		}
	}

	i := history.Curr + d
	if i < 0 || i >= len(history.Items) {
		return
	}

	item := history.Items[i]
	sg.Merge(item.SG)
	buttons.Merge(item.Buttons)

	history.Curr = i
	history.NeedSave = false
}

package main

type Buttons struct {
	Pushers []int64 `json:"pushers"`
	PushTimes []int64 `json:"pushTimes"`
	Answerers []int64 `json:"answerers"`
	Right int `json:"right"`
}

func NewButtons() *Buttons {
	buttons := new(Buttons)
	buttons.Right = -1
	return buttons
}

func (buttons *Buttons) Reset() {
	room.Buttons.Pushers = nil
	room.Buttons.PushTimes = nil
	room.Buttons.Answerers = nil
	room.Buttons.Right = -1
}

func (buttons *Buttons) Pushed(id int64) bool {
	return Int64FindIndex(buttons.Pushers, id) >= 0
}

func (buttons *Buttons) Answered(id int64) bool {
	return Int64FindIndex(buttons.Answerers, id) >= 0
}

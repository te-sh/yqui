package main

import (
	"errors"
)

type Buttons struct {
	Pushers []int64 `json:"pushers"`
	PushTimes []int64 `json:"pushTimes"`
	Answerers []int64 `json:"answerers"`
}

func NewButtons() *Buttons {
	buttons := new(Buttons)
	return buttons
}

func (buttons *Buttons) Reset() {
	buttons.Pushers = nil
	buttons.PushTimes = nil
	buttons.Answerers = nil
}

func (buttons *Buttons) Leave(id int64) {
	i := Int64FindIndex(buttons.Pushers, id)
	buttons.Pushers = Int64RemoveAt(buttons.Pushers, i)
	buttons.PushTimes = Int64RemoveAt(buttons.PushTimes, i)
	buttons.Answerers = Int64Remove(buttons.Answerers, id)
}

func (buttons *Buttons) Push(id int64, time int64) {
	buttons.Pushers = append(buttons.Pushers, id)
	buttons.PushTimes = append(buttons.PushTimes, time)
}

func (buttons *Buttons) Pushed(id int64) bool {
	return Int64FindIndex(buttons.Pushers, id) >= 0
}

func (buttons *Buttons) Answer(id int64) {
	buttons.Answerers = append(buttons.Answerers, id)
}

func (buttons *Buttons) Answered(id int64) bool {
	return Int64FindIndex(buttons.Answerers, id) >= 0
}

func (buttons *Buttons) AllAnswered() bool {
	return len(buttons.Pushers) == len(buttons.Answerers)
}

func (buttons *Buttons) RightPlayer() (int64, error) {
	if buttons.AllAnswered() {
		return -1, errors.New("No player has right")
	}
	return buttons.Pushers[len(buttons.Answerers)], nil
}

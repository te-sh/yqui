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
	room.Buttons.Pushers = nil
	room.Buttons.PushTimes = nil
	room.Buttons.Answerers = nil
}

func (buttons *Buttons) Pushed(id int64) bool {
	return Int64FindIndex(buttons.Pushers, id) >= 0
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

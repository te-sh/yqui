package main

import (
	"errors"
)

type Buttons struct {
	Pushers   []int64 `json:"pushers"`
	PushTimes []int64 `json:"pushTimes"`
	Answerers []int64 `json:"answerers"`
}

type Button struct {
	User              map[int64]*ButtonUser `json:"user"`
	ContinueingChance bool                  `json:"continueingChance"`
}

type ButtonUser struct {
	Order  int   `json:"order"`
	Delay  int64 `json:"delay"`
	MyTurn bool  `json:"myTurn"`
}

func NewButtons() *Buttons {
	buttons := new(Buttons)
	return buttons
}

func NewButton(buttons *Buttons) *Button {
	status := new(Button)
	status.User = make(map[int64]*ButtonUser)
	for i, pusher := range buttons.Pushers {
		user := new(ButtonUser)
		user.Order = i + 1
		user.Delay = buttons.PushTimes[i] - buttons.PushTimes[0]
		user.MyTurn = i == len(buttons.Answerers)
		status.User[pusher] = user
	}
	status.ContinueingChance = len(buttons.Pushers) > 0 && len(buttons.Pushers) == len(buttons.Answerers)
	return status
}

func (buttons *Buttons) Clone() *Buttons {
	newButtons := NewButtons()
	newButtons.Merge(buttons)
	return newButtons
}

func (buttons *Buttons) Merge(newButtons *Buttons) {
	buttons.Pushers = make([]int64, len(newButtons.Pushers))
	copy(buttons.Pushers, newButtons.Pushers)
	buttons.PushTimes = make([]int64, len(newButtons.PushTimes))
	copy(buttons.PushTimes, newButtons.PushTimes)
	buttons.Answerers = make([]int64, len(newButtons.Answerers))
	copy(buttons.Answerers, newButtons.Answerers)
}

func (buttons *Buttons) Reset() {
	buttons.Pushers = nil
	buttons.PushTimes = nil
	buttons.Answerers = nil
}

func (buttons *Buttons) Remove(id int64) {
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

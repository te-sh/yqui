package main

import (
	"time"
)

const TimerTickInterval = 100

type Timer struct {
	Room           *Room     `json:"-"`
	Running        bool      `json:"running"`
	Remaining      int       `json:"remaining"`
	RemainingMilli int64     `json:"-"`
	StartTime      time.Time `json:"-"`
	SetRemaining   chan int  `json:"-"`
	ToggleRunning  chan int  `json:"-"`
}

func NewTimer(room *Room) *Timer {
	timer := new(Timer)
	timer.Room = room
	timer.Running = false
	timer.Remaining = 0
	timer.RemainingMilli = 0
	timer.StartTime = time.Now()
	timer.SetRemaining = make(chan int)
	timer.ToggleRunning = make(chan int)
	go timer.Activate()
	return timer
}

func (timer *Timer) Activate() {
	LogPanic()

	ticker := time.NewTicker(TimerTickInterval * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case remaining := <-timer.SetRemaining:
			timer.Running = false
			timer.Remaining = remaining
			timer.RemainingMilli = int64(remaining) * 1000
			timer.Room.SendTimer()
		case <-timer.ToggleRunning:
			if timer.Running {
				timer.Running = false
				_, remainingMilli := timer.CalcRemaining()
				timer.RemainingMilli = remainingMilli
			} else if timer.RemainingMilli > 0 {
				timer.Running = true
				timer.StartTime = time.Now()
			}
			timer.Room.SendTimer()
		case <-ticker.C:
			if !timer.Running {
				continue
			}
			if changed, remainingMilli := timer.CalcRemaining(); changed {
				if timer.Remaining <= 0 {
					timer.Running = false
					timer.RemainingMilli = remainingMilli
					timer.Room.SendSound(TimeupSound())
				}
				timer.Room.SendTimer()
			}
		}
	}
}

func (timer *Timer) CalcRemaining() (bool, int64) {
	remainingMilli := timer.RemainingMilli - time.Now().Sub(timer.StartTime).Milliseconds()
	newRemaining := int((remainingMilli + 999) / 1000)
	changed := timer.Remaining != newRemaining
	timer.Remaining = newRemaining
	return changed, remainingMilli
}

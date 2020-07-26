package main

import (
	"encoding/json"
	"strings"
)

type Cmd struct {
	C    string          `json:"c"`
	A    json.RawMessage `json:"a"`
	ID   int64           `json:"-"`
	Time int64           `json:"-"`
}

type Join struct {
	RoomNo   int    `json:"roomNo"`
	Name     string `json:"name"`
	Observer bool   `json:"observer"`
}

type Chat struct {
	Type string `json:"type"`
	Time int64  `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

type Sound struct {
	Push    bool
	Correct bool
	Wrong   bool
	Win     bool
	Lose    bool
	Open    bool
}

func NewSound() *Sound {
	sound := new(Sound)
	return sound
}

func (sound *Sound) MakeSounds() string {
	var sounds []string
	if sound.Push {
		sounds = append(sounds, "push")
	}
	if sound.Open {
		sounds = append(sounds, "open")
	}
	if sound.Correct {
		sounds = append(sounds, "correct")
	}
	if sound.Wrong {
		sounds = append(sounds, "wrong")
	}
	if sound.Win {
		sounds = append(sounds, "roundwin")
	}
	return strings.Join(sounds, ",")
}

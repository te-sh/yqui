package main

import "encoding/json"

type JudgeArg struct {
	NextQuiz bool `json:"nextQuiz"`
}

type ClearArg struct {
	Win      bool `json:"win"`
	Lose     bool `json:"lose"`
	WinTimes bool `json:"winTimes"`
}

func NewClearArg() *ClearArg {
	clearArg := new(ClearArg)
	clearArg.Win = true
	clearArg.Lose = true
	clearArg.WinTimes = true
	return clearArg
}

type Chat struct {
	Type string `json:"type"`
	Time int64  `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

func NewSystemChat(typ string, cmd Cmd, user *User) Chat {
	return Chat{Type: typ, Time: cmd.Time, Name: user.Name, Text: user.Place()}
}

func NewNormalChat(cmd Cmd, user *User) Chat {
	chat := Chat{Type: "message", Time: cmd.Time, Name: user.Name}
	json.Unmarshal(cmd.A, &chat.Text)
	return chat
}

type Sound struct {
	Push    bool
	Correct bool
	Wrong   bool
	Win     bool
	Lose    bool
	Open    bool
	Timeup  bool
	Chat    bool
}

func NewSound() *Sound {
	sound := new(Sound)
	return sound
}

func TimeupSound() *Sound {
	sound := new(Sound)
	sound.Timeup = true
	return sound
}

func ChatSound() *Sound {
	sound := new(Sound)
	sound.Chat = true
	return sound
}

func (sound *Sound) MakeSounds() []string {
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
	if sound.Timeup {
		sounds = append(sounds, "timeup")
	}
	if sound.Chat {
		sounds = append(sounds, "chat")
	}
	return sounds
}

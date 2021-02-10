package main

type JudgeArg struct {
	NextQuiz bool `json:"nextQuiz"`
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
	Timeup  bool
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
	return sounds
}

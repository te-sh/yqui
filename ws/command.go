package main

import (
	"strings"
	"encoding/json"
)

func (room *Room) RunCommand(cmd Cmd) {
	sound := NewSound()
	switch (cmd.C) {
	case "a":
		room.PushButton(cmd.ID, cmd.Time, sound)
		room.SendSound(sound)
	case "s":
		win := room.Correct()
		if win {
			room.Broadcast("sound", "correct,roundwin")
		} else {
			room.Broadcast("sound", "correct")
		}
	case "f":
		room.Wrong()
		room.Broadcast("sound", "wrong")
	case "n":
		room.NextQuiz()
		room.AddHistory()
		room.ResetBoards()
	case "r":
		room.ResetButtons()
		room.ResetBoards()
	case "e":
		room.AllClear()
		room.ResetBoards()
	case "u":
		room.MoveHistory(-1)
	case "o":
		room.MoveHistory(+1)
	case "z":
		user := new(User)
		json.Unmarshal(cmd.A, &user)
		room.UpdateUser(user)
	case "p":
		json.Unmarshal(cmd.A, &room.Teams)
		room.ChangeTeams()
	case "b":
		newBoards := make(Boards)
		json.Unmarshal(cmd.A, &newBoards)
		open, correct, win, wrong, _ := room.UpdateBoards(newBoards)
		sounds := BoardOpenSounds(open, correct, win, wrong)
		if sounds != "" {
			room.Broadcast("sound", sounds)
		}
	case "t":
		newBoard := NewBoard(cmd.ID)
		json.Unmarshal(cmd.A, newBoard)
		open, correct, win, wrong, _ := room.UpdateBoard(newBoard)
		sounds := BoardOpenSounds(open, correct, win, wrong)
		if sounds != "" {
			room.Broadcast("sound", sounds)
		}
	case "k":
		room.BoardLock = !room.BoardLock
		room.SendBoardLock()
	case "l":
		json.Unmarshal(cmd.A, &room.Rule)
		room.SendRule()
	case "m":
		room.ToggleMaster(cmd.ID)
	case "c":
		name := room.Users[cmd.ID].Name
		chat := Chat{Type: "message", Time: cmd.Time, Name: name}
		json.Unmarshal(cmd.A, &chat.Text)
		room.Broadcast("chat", chat)
	}
}

func (room *Room) SendSound(sound *Sound) {
	sounds := sound.MakeSounds()
	if sounds != "" {
		room.Broadcast("sound", sounds)
	}
}

func BoardOpenSounds(open bool, correct bool, win bool, wrong bool) string {
	var sounds []string
	if (open) {
		sounds = append(sounds, "open")
	}
	if (correct) {
		sounds = append(sounds, "correct")
	}
	if (wrong) {
		sounds = append(sounds, "wrong")
	}
	if (win) {
		sounds = append(sounds, "roundwin")
	}
	return strings.Join(sounds, ",")
}

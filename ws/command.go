package main

import (
	"encoding/json"
)

func (room *Room) RunCommand(cmd Cmd) {
	sound := NewSound()
	switch cmd.C {
	case "a":
		room.PushButton(cmd.ID, cmd.Time, sound)
		room.SendSound(sound)
	case "s":
		room.Correct(sound)
		sound.Correct = true
		room.SendSound(sound)
	case "f":
		room.Wrong(sound)
		sound.Wrong = true
		room.SendSound(sound)
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
		room.UpdateBoards(newBoards, sound)
		room.SendSound(sound)
	case "t":
		newBoard := NewBoard(cmd.ID)
		json.Unmarshal(cmd.A, newBoard)
		room.UpdateBoard(newBoard, sound)
		room.SendSound(sound)
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

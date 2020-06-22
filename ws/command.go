package main

import (
	"encoding/json"
)

func (room *Room) RunCommand(cmd Cmd) {
	switch (cmd.C) {
	case "a":
		ring := room.PushButton(cmd.ID, cmd.Time)
		if (ring) {
			room.Broadcast("sound", "push")
		}
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
		correct, win, wrong, _ := room.UpdateBoards(newBoards)
		room.Broadcast("sound", BoardOpenSounds(correct, win, wrong))
	case "t":
		newBoard := NewBoard(cmd.ID)
		json.Unmarshal(cmd.A, newBoard)
		correct, win, wrong, _ := room.UpdateBoard(newBoard)
		room.Broadcast("sound", BoardOpenSounds(correct, win, wrong))
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

func BoardOpenSounds(correct bool, win bool, wrong bool) string {
	sounds := "open"
	if (correct) {
		sounds += ",correct"
	}
	if (wrong) {
		sounds += ",wrong"
	}
	if (win) {
		sounds += ",roundwin"
	}
	return sounds
}

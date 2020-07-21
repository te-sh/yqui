package main

import (
	"encoding/json"
)

func HandleMessage() {
	defer LogPanic()

	for {
		cmd := <-Received
		if room, ok := id2room[cmd.ID]; ok {
			room.RunCommand(cmd)
		}
	}
}

func (room *Room) RunCommand(cmd Cmd) {
	sound := NewSound()
	switch cmd.C {
	case "user":
		user := new(User)
		json.Unmarshal(cmd.A, &user)
		room.Users.Update(user)
		room.SendRoom()
	case "teams":
		json.Unmarshal(cmd.A, &room.Teams)
		room.ChangeTeams()
	case "push":
		room.PushButton(cmd.ID, cmd.Time, sound)
		room.SendSound(sound)
	case "correct":
		room.Correct(sound)
		room.SendScores()
		sound.Correct = true
		room.SendSound(sound)
	case "wrong":
		room.Wrong(sound)
		room.SendScores()
		sound.Wrong = true
		room.SendSound(sound)
	case "through":
		room.NextQuiz()
		room.History.Add(room.SG)
		room.SendScores()
		room.ResetBoards()
	case "reset":
		room.Buttons.Reset()
		room.SendButtons()
		room.ResetBoards()
	case "all-clear":
		room.AllClear()
		room.SendScores()
		room.ResetBoards()
	case "undo":
		room.History.Move(-1, room.SG)
		room.SendScores()
	case "redo":
		room.History.Move(+1, room.SG)
		room.SendScores()
	case "boards":
		newBoards := make(Boards)
		json.Unmarshal(cmd.A, &newBoards)
		room.UpdateBoards(newBoards, sound)
		room.SendScores()
		room.SendSound(sound)
	case "board":
		newBoard := NewBoard(cmd.ID)
		json.Unmarshal(cmd.A, newBoard)
		room.UpdateBoard(newBoard, sound)
		room.SendScores()
		room.SendSound(sound)
	case "board-lock":
		room.BoardLock = !room.BoardLock
		room.SendBoardLock()
	case "toggle-master":
		room.ToggleMaster(cmd.ID)
	case "rule":
		json.Unmarshal(cmd.A, &room.Rule)
		room.SendRoom()
	case "chat":
		name := room.Users[cmd.ID].Name
		chat := Chat{Type: "message", Time: cmd.Time, Name: name}
		json.Unmarshal(cmd.A, &chat.Text)
		room.SendChat(chat)
	}
}

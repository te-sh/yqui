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
		json.Unmarshal(cmd.A, user)
		room.Users.Update(user)
		room.SendRoom()
	case "teams":
		json.Unmarshal(cmd.A, &room.Teams)
		room.ChangeTeams()
		room.SendRoom()
	case "push":
		room.PushButton(cmd.ID, cmd.Time, sound)
		room.SendButtons()
		room.SendSound(sound)
	case "correct":
		room.Correct(sound)
		room.SendSG()
		room.SendButtons()
		sound.Correct = true
		room.SendSound(sound)
	case "wrong":
		room.Wrong(sound)
		room.SendSG()
		room.SendButtons()
		sound.Wrong = true
		room.SendSound(sound)
	case "through":
		room.ResetBoards()
		room.NextQuiz()
		room.History.Add(room.SG)
		room.SendBoards()
		room.SendBoardLock()
		room.SendSG()
		room.SendButtons()
	case "reset":
		room.ResetBoards()
		room.Buttons.Reset()
		room.SendBoards()
		room.SendBoardLock()
		room.SendButtons()
	case "all-clear":
		room.ResetBoards()
		room.AllClear()
		room.SendBoards()
		room.SendBoardLock()
		room.SendSG()
		room.SendButtons()
	case "undo":
		room.History.Move(-1, room.SG)
		room.SendSG()
	case "redo":
		room.History.Move(+1, room.SG)
		room.SendSG()
	case "boards":
		newBoards := make(Boards)
		json.Unmarshal(cmd.A, &newBoards)
		room.UpdateBoards(newBoards, sound)
		room.SendBoards()
		room.SendSG()
		room.SendSound(sound)
	case "board":
		newBoard := NewBoard()
		json.Unmarshal(cmd.A, newBoard)
		room.UpdateBoards(Boards{newBoard.ID: newBoard}, sound)
		room.SendBoard(newBoard.ID)
		room.SendSG()
		room.SendSound(sound)
	case "board-lock":
		room.BoardLock = !room.BoardLock
		room.SendBoardLock()
	case "toggle-master":
		room.ToggleMaster(cmd.ID)
		room.SendRoom()
	case "rule":
		json.Unmarshal(cmd.A, room.Rule)
		room.SendRoom()
	case "chat":
		if user, ok := room.Users[cmd.ID]; ok {
			chat := Chat{Type: "message", Time: cmd.Time, Name: user.Name}
			json.Unmarshal(cmd.A, &chat.Text)
			room.SendChat(chat)
		}
	}
}

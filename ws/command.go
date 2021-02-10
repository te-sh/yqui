package main

import (
	"encoding/json"
)

var Command = make(chan Cmd)

func HandleCommand() {
	defer LogPanic()

	for {
		cmd := <-Command
		if room, ok := mapper.GetRoom(cmd.ID); ok {
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
		judgeArg := new(JudgeArg)
		json.Unmarshal(cmd.A, judgeArg)
		room.Correct(judgeArg, sound)
		room.SendSG()
		room.SendButtons()
		sound.Correct = true
		room.SendSound(sound)
	case "wrong":
		judgeArg := new(JudgeArg)
		json.Unmarshal(cmd.A, judgeArg)
		room.Wrong(judgeArg, sound)
		room.SendSG()
		room.SendButtons()
		sound.Wrong = true
		room.SendSound(sound)
	case "through":
		room.Through()
		room.SendBG()
		room.SendSG()
		room.SendButtons()
	case "reset":
		room.Reset()
		room.SendBG()
		room.SendButtons()
	case "all-clear":
		room.AllClear()
		room.SendBG()
		room.SendSG()
		room.SendButtons()
	case "undo":
		room.History.Move(-1, room.SG, room.Buttons)
		room.SendSG()
		room.SendButtons()
	case "redo":
		room.History.Move(+1, room.SG, room.Buttons)
		room.SendSG()
		room.SendButtons()
	case "win-top":
		room.WinTop(sound)
		room.SendBG()
		room.SendSG()
		room.SendButtons()
		room.SendSound(sound)
	case "lose-bottom":
		room.LoseBottom(sound)
		room.SendBG()
		room.SendSG()
		room.SendButtons()
		room.SendSound(sound)
	case "boards":
		newBoards := make(Boards)
		json.Unmarshal(cmd.A, &newBoards)
		room.UpdateBoards(newBoards, sound)
		room.SendBG()
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
		json.Unmarshal(cmd.A, &room.BG.Lock)
		room.SendBG()
	case "toggle-observer":
		room.ToggleObserver(cmd.ID)
		room.SendRoom()
	case "toggle-master":
		room.ToggleMaster(cmd.ID)
		room.SendRoom()
	case "rule":
		rule := NewRule()
		json.Unmarshal(cmd.A, rule)
		room.SetRule(rule)
		room.SendRoom()
	case "toggle-timer":
		room.ToggleTimer()
	case "chat":
		if user, ok := room.Users[cmd.ID]; ok {
			chat := Chat{Type: "message", Time: cmd.Time, Name: user.Name}
			json.Unmarshal(cmd.A, &chat.Text)
			room.SendChat(chat)
		}
	}
}

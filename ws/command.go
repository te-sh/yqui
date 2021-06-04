package main

import "encoding/json"

const CommandChannelCapacity = 64

var Command = make(chan Cmd, CommandChannelCapacity)

type Cmd struct {
	C    string          `json:"c"`
	A    json.RawMessage `json:"a"`
	ID   int64           `json:"-"`
	Time int64           `json:"-"`
}

func HandleCommand() {
	defer LogPanic()

	for {
		cmd := <-Command
		if cmd.C == "join" {
			join := MakeJoin(cmd)
			if room, ok := rooms.GetRoom(join.RoomNo); ok {
				room.RunCommand(cmd)
			} else {
				LogError("join user", Log{Message: "failed to get room", Json: join})
			}
		} else if room, ok := mapper.GetRoom(cmd.ID); ok {
			if room.AvailableCommand(cmd) {
				room.RunCommand(cmd)
			}
		}
	}
}

var MasterCommand = []string{
	"tag", "correct", "wrong", "through", "reset", "all-clear", "undo", "redo",
	"win-top", "lose-bottom", "board-lock", "rule", "toggle-timer",
}

func (room *Room) AvailableCommand(cmd Cmd) bool {
	user, ok := room.Users[cmd.ID]
	if !ok {
		return false
	}
	for _, c := range MasterCommand {
		if c == cmd.C {
			return user.IsMaster
		}
	}
	return true
}

func (room *Room) RunCommand(cmd Cmd) {
	sound := NewSound()
	switch cmd.C {
	case "join":
		join := MakeJoin(cmd)
		if user, ok := room.JoinUser(cmd.ID, join); ok {
			room.SendRoom()
			rooms.SendRooms()
			room.SendChat(NewSystemChat("join", cmd, user))
		} else {
			SendToOne(cmd.ID, room, "failedJoin", nil, true)
		}
	case "leave":
		if user, ok := room.LeaveUser(cmd.ID); ok {
			room.SendRoom()
			rooms.SendRooms()
			room.SendChat(NewSystemChat("leave", cmd, user))
		}
	case "user":
		user := new(User)
		json.Unmarshal(cmd.A, user)
		room.Users.Update(user)
		room.SendRoom()
	case "tag":
		json.Unmarshal(cmd.A, &room.Tag)
		room.SendRoom()
		rooms.SendRooms()
		if user, ok := room.Users[cmd.ID]; ok {
			room.SendChat(NewSystemChat("update-tag", cmd, user))
		}
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
		room.RenewAESKey()
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
	case "toggle-master":
		if user, ok := room.ToggleMaster(cmd.ID); ok {
			room.SendChat(NewSystemChat("move", cmd, user))
		}
		room.SendRoom()
	case "toggle-observer":
		if user, ok := room.ToggleObserver(cmd.ID); ok {
			room.SendChat(NewSystemChat("move", cmd, user))
		}
		room.SendRoom()
	case "rule":
		rule := NewRule()
		json.Unmarshal(cmd.A, rule)
		room.SetRule(rule)
		room.SendRoom()
	case "scores":
		scores := make(Scores)
		json.Unmarshal(cmd.A, &scores)
		room.UpdateScores(scores)
		room.SendSG()
	case "toggle-timer":
		room.ToggleTimer()
	case "chat":
		if user, ok := room.Users[cmd.ID]; ok {
			chat := Chat{Type: "message", Time: cmd.Time, Name: user.Name}
			json.Unmarshal(cmd.A, &chat.Text)
			room.SendChat(NewNormalChat(cmd, user))
			room.SendSound(ChatSound())
		}
	}
}

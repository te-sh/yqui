package main

import (
	"context"
	"log"
	"encoding/json"
	"net/http"
	"github.com/gorilla/websocket"
)

var rooms = [...]*Room{NewRoom()}
var id2room = make(map[int64]*Room)
var Received = make(chan Cmd)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Cmd struct {
	C string `json:"c"`
	A json.RawMessage `json:"a"`
	ID int64 `json:"-"`
	Time int64 `json:"-"`
}

type Join struct {
	Name string `json:"name"`
}

func JoinUser(id int64, conn *Conn, cmd Cmd) {
	var join Join
	json.Unmarshal(cmd.A, &join)
	room := rooms[0]
	id2room[id] = room
	room.JoinUser(id, conn, join.Name, NowMilliSec())
}

func LeaveUser(id int64) {
	if room, ok := id2room[id]; ok {
		delete(id2room, id)
		room.LeaveUser(id, NowMilliSec())
	}
}

func HandleMessage() {
	for {
		cmd := <-Received
		if room, ok := id2room[cmd.ID]; ok {
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
			case "r":
				room.ResetButtons()
			case "e":
				room.AllClear()
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
	}
}

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("err upgrade: ", err)
		return
	}
	defer c.Close()

	ctx := context.Background()

	conn := NewConn(c)
	cctx, cancelConn := context.WithCancel(ctx)
	go conn.Activate(cctx)
	defer cancelConn()

	c.SetCloseHandler(func(code int, text string) error {
		log.Println("close: ", text)
		return nil
	})

	id := NewID()

	for {
		var cmd Cmd
		err := c.ReadJSON(&cmd)
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		log.Println("received: ", cmd)

		if (cmd.C == "j") {
			JoinUser(id, conn, cmd)
			defer LeaveUser(id)
			continue
		}

		cmd.ID = id
		cmd.Time = NowMilliSec()
		Received <- cmd
	}
}

func main() {
	SetRandSeed()
	go HandleMessage()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

package main

import (
	"context"
	"log"
	"time"
	"encoding/json"
	"math/rand"
	"net/http"
	"github.com/gorilla/websocket"
)

var room = NewRoom()
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

func HandleMessage() {
	for {
		cmd := <-Received
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
			room.NextQuiz(true)
			room.AddHistory()
		case "r":
			room.ResetButtons(true)
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
			json.Unmarshal(cmd.A, &room.Attendees)
			room.ChangeAttendees()
		case "l":
			json.Unmarshal(cmd.A, &room.Rule)
			room.Broadcast("rule", room.Rule)
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

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	if name == "" {
		return
	}

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

	id := room.JoinUser(conn, name, NowMilliSec())
	defer room.LeaveUser(id, NowMilliSec())

	for {
		var cmd Cmd
		err := c.ReadJSON(&cmd)
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		log.Println("received: ", cmd)
		cmd.ID = id
		cmd.Time = NowMilliSec()
		Received <- cmd
	}
}

func NowMilliSec() int64 {
	return time.Now().UnixNano() / 1_000_000
}

func main() {
	rand.Seed(time.Now().UnixNano())

	go HandleMessage()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

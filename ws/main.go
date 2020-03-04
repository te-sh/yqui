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
	A string `json:"a"`
	ID int64 `json:"-"`
	Time int64 `json:"-"`
}

type Chat struct {
	Name string `json:"name"`
	Text string `json:"text"`
	Time int64 `json:"time"`
}

func HandleMessage() {
	for {
		cmd := <- Received
		switch (cmd.C) {
		case "a":
			room.PushButton(cmd.ID, cmd.Time)
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
		case "r":
			room.ResetButtons()
		case "e":
			room.AllClear()
		case "u":
			room.MoveHistory(-1)
		case "o":
			room.MoveHistory(+1)
		case "p":
			json.Unmarshal([]byte(cmd.A), &room.Attendees.Players)
			room.Broadcast("attendees", room.Attendees)
		case "l":
			json.Unmarshal([]byte(cmd.A), &room.Rule)
			room.Broadcast("rule", room.Rule)
		case "d":
			room.Rule.ShowPoint = cmd.A == "true"
			room.Broadcast("rule", room.Rule)
		case "m":
			room.ToggleMaster(cmd.ID)
		case "c":
			name := room.Users[cmd.ID].Name
			chat := Chat{Name: name, Text: cmd.A, Time: cmd.Time}
			room.Broadcast("chat", chat)
		}
	}
}

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name");
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

	id := room.JoinUser(conn, name)
	defer room.LeaveUser(id)

	for {
		var cmd Cmd
		err := c.ReadJSON(&cmd)
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		log.Println("received: ", cmd)
		cmd.ID = id
		cmd.Time = time.Now().UnixNano() / 1000
		Received <- cmd
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	go HandleMessage()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

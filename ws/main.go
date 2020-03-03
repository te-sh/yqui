package main

import (
	"log"
	"time"
	"encoding/json"
	"math/rand"
	"net/http"
	"github.com/gorilla/websocket"
)

var ids = make(map[*websocket.Conn]int64)
var room = NewRoom()

var Received = make(chan Cmd)
var Sending = make(chan Message)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func Ping() {
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	for {
		<- ticker.C
		log.Println("ping")
		for c := range ids {
			err := c.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				log.Println("err ping: ", err)
				return
			}
		}
	}
}

func Broadcast() {
	for {
		msg := <- Sending
		log.Println("write: ", msg)
		for c := range ids {
			err := c.WriteJSON(msg)
			if err != nil {
				log.Println("err write: ", err)
				return
			}
		}
	}
}

func HandleMessage() {
	for {
		cmd := <- Received
		switch (cmd.C) {
		case "a":
			sound := room.PushButton(cmd.ID, cmd.Time)
			if sound {
				Sending <- Message{Type: "sound", Content: "push"}
			}
			Sending <- Message{Type: "buttons", Content: room.Buttons}
		case "s":
			win := room.Correct()
			if win {
				Sending <- Message{Type: "sound", Content: "correct,roundwin"}
			} else {
				Sending <- Message{Type: "sound", Content: "correct"}
			}
			Sending <- Message{Type: "scores", Content: room.Scores}
			Sending <- Message{Type: "buttons", Content: room.Buttons}
		case "f":
			room.Wrong()
			Sending <- Message{Type: "sound", Content: "wrong"}
			Sending <- Message{Type: "scores", Content: room.Scores}
			Sending <- Message{Type: "buttons", Content: room.Buttons}
		case "n":
			room.NextQuiz(true)
			Sending <- Message{Type: "scores", Content: room.Scores}
			Sending <- Message{Type: "buttons", Content: room.Buttons}
		case "r":
			room.ResetButtons()
			Sending <- Message{Type: "buttons", Content: room.Buttons}
		case "e":
			room.AllClear()
			Sending <- Message{Type: "scores", Content: room.Scores}
			Sending <- Message{Type: "buttons", Content: room.Buttons}
		case "u":
			room.MoveHistory(-1)
			Sending <- Message{Type: "scores", Content: room.Scores}
		case "o":
			room.MoveHistory(+1)
			Sending <- Message{Type: "scores", Content: room.Scores}
		case "l":
			json.Unmarshal([]byte(cmd.A), &room.Rule)
			Sending <- Message{Type: "rule", Content: room.Rule}
		case "m":
			room.ToggleMaster(cmd.ID)
			Sending <- Message{Type: "attendees", Content: room.Attendees}
			Sending <- Message{Type: "scores", Content: room.Scores}
		case "c":
			name := room.Attendees.Users[cmd.ID].Name
			chat := Chat{Name: name, Text: cmd.A, Time: cmd.Time}
			Sending <- Message{Type: "chat", Content: chat}
		}
	}
}

func AddClient(c *websocket.Conn, name string) {
	id := room.JoinUser(name)
	ids[c] = id

	Sending <- Message{Type: "attendees", Content: room.Attendees}
	Sending <- Message{Type: "buttons", Content: room.Buttons}
	Sending <- Message{Type: "scores", Content: room.Scores}
	Sending <- Message{Type: "rule", Content: room.Rule}
}

func RemoveClient(c *websocket.Conn) {
	id := ids[c]
	room.LeaveUser(id)
	delete(ids, c)

	Sending <- Message{Type: "attendees", Content: room.Attendees}
	Sending <- Message{Type: "buttons", Content: room.Buttons}
	Sending <- Message{Type: "scores", Content: room.Scores}
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

	c.SetCloseHandler(func(code int, text string) error {
		log.Println("close: ", text)
		return nil
	})

	AddClient(c, name)
	defer RemoveClient(c)

	err2 := c.WriteJSON(Message{Type: "selfID", Content: ids[c]})
	if err2 != nil {
		log.Println("err write: ", err2)
		return
	}

	for {
		var cmd Cmd
		err := c.ReadJSON(&cmd)
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		log.Println("received: ", cmd)
		cmd.ID = ids[c]
		cmd.Time = time.Now().UnixNano() / 1000
		Received <- cmd
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	go HandleMessage()
	go Broadcast()
	go Ping()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

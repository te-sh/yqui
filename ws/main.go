package main

import (
	"log"
	"time"
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
		case "c":
			chat := Chat{Name: room.Users[cmd.ID].Name, Text: cmd.A, Time: time.Now().UnixNano()}
			Sending <- Message{Type: "chat", Content: chat}
		}
	}
}

func AddClient(c *websocket.Conn, name string) {
	id := rand.Int63n(1<<53)
	ids[c] = id
	room.Users[id] = User{name}
	room.Players = append(room.Players, id)

	Sending <- Message{Type: "room", Content: room}
}

func RemoveClient(c *websocket.Conn) {
	id := ids[c]
	if room.Master == id {
		room.Master = -1
	} else {
		room.Players = Int64RemoveFirst(room.Players, id)
	}
	delete(room.Users, id)
	delete(ids, c)

	Sending <- Message{Type: "room", Content: room}
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

	for {
		var cmd Cmd
		err := c.ReadJSON(&cmd)
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		log.Println("received: ", cmd)
		cmd.ID = ids[c]
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

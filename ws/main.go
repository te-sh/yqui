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
var Sending = make(chan interface {})

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
		cmd := <- Sending
		log.Println("write: ", cmd)
		for c := range ids {
			err := c.WriteJSON(cmd)
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
		Sending <- cmd
	}
}

func AddClient(c *websocket.Conn, name string) {
	id := rand.Int63()
	ids[c] = id
	room.IDs = append(room.IDs, id)
	room.Users[id] = User{name}

	Sending <- room
}

func RemoveClient(c *websocket.Conn) {
	id := ids[c]
	room.IDs = Int64RemoveFirst(room.IDs, id)
	delete(ids, c)

	Sending <- room
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

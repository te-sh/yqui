package main

import (
	"log"
	"time"
	"net/http"
	"github.com/gorilla/websocket"
)

type Cmd struct {
	C string `json:"c"`
	A string `json:"a"`
}

var clients = make(map[*websocket.Conn]bool)
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
		for c := range clients {
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
		for c := range clients {
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

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("err upgrade: ", err)
		return
	}

	c.SetCloseHandler(func(code int, text string) error {
		log.Println("close: ", text)
		return nil
	})

	clients[c] = true
	defer delete(clients, c)

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
	go HandleMessage()
	go Broadcast()
	go Ping()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

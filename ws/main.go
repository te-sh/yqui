package main

import (
	"log"
	"time"
	"net/http"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var Received = make(chan []byte)
var Sending = make(chan []byte)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func Broadcast() {
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		mt, m := func() (int, []byte) {
			select {
			case m := <- Sending:
				return websocket.TextMessage, m
			case <- ticker.C:
				return websocket.PingMessage, []byte{}
			}
		}()

		log.Printf("write: %s", m)
		for c := range clients {
			err := c.WriteMessage(mt, m)
			if err != nil {
				log.Println("err write: ", err)
				return
			}
		}
	}
}

func HandleMessage() {
	for {
		m := <- Received
		Sending <- m
	}
}

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("err upgrade: ", err)
		return
	}

	clients[c] = true
	defer delete(clients, c)

	for {
		mt, m, err := c.ReadMessage()
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		log.Printf("received: %s", m)

		if mt == websocket.CloseMessage {
			c.Close()
			return
		}

		Received <- m
	}
}

func main() {
	go HandleMessage()
	go Broadcast()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

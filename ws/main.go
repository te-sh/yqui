package main

import (
	"log"
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
	for {
		m := <- Sending
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, m)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
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
		log.Print("upgrade: ", err)
		return
	}

	clients[c] = true
	defer c.Close()

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read: ", err)
			break
		}

		log.Printf("received: %s", message)
		Received <- message
	}
}

func main() {
	go HandleMessage()
	go Broadcast()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

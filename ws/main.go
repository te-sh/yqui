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
var rule = NewRule()
var answers []int64
var answerTimes []int64
var right int = -1

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
			if Int64FindIndex(answers, cmd.ID) < 0 &&
				room.Users[cmd.ID].WinOrder < 0 && room.Users[cmd.ID].LoseOrder < 0 {
				if len(answers) == 0 {
					right = 0
					Sending <- Message{Type: "sound", Content: "push"}
					Sending <- Message{Type: "right", Content: right}
				}
				answers = append(answers, cmd.ID)
				answerTimes = append(answerTimes, cmd.Time)
				Sending <- Message{Type: "answers", Content: answers}
				Sending <- Message{Type: "answerTimes", Content: answerTimes}
			}
		case "s":
			if right < 0 || right >= len(answers) {
				continue
			}
			player, ok := room.Users[answers[right]]
			if ok {
				player.Correct += rule.CorrectByCorrect
				if player.Correct >= rule.WinCorrect {
					Win(room, player)
				}
			}
			right = -1
			if player.WinOrder >= 0 {
				Sending <- Message{Type: "sound", Content: "correct,roundwin"}
			} else {
				Sending <- Message{Type: "sound", Content: "correct"}
			}
			Sending <- Message{Type: "room", Content: room}
			Sending <- Message{Type: "right", Content: right}
		case "f":
			if right < 0 || right >= len(answers) {
				continue
			}
			player, ok := room.Users[answers[right]]
			if ok {
				player.Wrong += rule.WrongByWrong
				if player.Wrong >= rule.LoseWrong {
					Lose(room, player)
				}
			}
			if right < len(answers) - 1 {
				right += 1
			}
			Sending <- Message{Type: "sound", Content: "wrong"}
			Sending <- Message{Type: "room", Content: room}
			Sending <- Message{Type: "right", Content: right}
		case "r":
			answers = nil
			answerTimes = nil
			right = -1
			Sending <- Message{Type: "answers", Content: answers}
			Sending <- Message{Type: "answerTimes", Content: answerTimes}
			Sending <- Message{Type: "right", Content: right}
		case "e":
			answers = nil
			answerTimes = nil
			right = -1
			for id := range room.Users {
				user := room.Users[id]
				user.Correct = 0
				user.Wrong = 0
				user.WinOrder = -1
				user.LoseOrder = -1
			}
			Sending <- Message{Type: "answers", Content: answers}
			Sending <- Message{Type: "answerTimes", Content: answerTimes}
			Sending <- Message{Type: "right", Content: right}
			Sending <- Message{Type: "room", Content: room}
		case "l":
			json.Unmarshal([]byte(cmd.A), &rule)
			Sending <- Message{Type: "rule", Content: rule}
		case "m":
			if room.Master == cmd.ID {
				room.Master = -1
				room.Players = append(room.Players, cmd.ID)
			} else if room.Master < 0 {
				room.Master = cmd.ID
				room.Players = Int64Remove(room.Players, cmd.ID)
			}
			Sending <- Message{Type: "room", Content: room}
		case "c":
			chat := Chat{Name: room.Users[cmd.ID].Name, Text: cmd.A, Time: cmd.Time}
			Sending <- Message{Type: "chat", Content: chat}
		}
	}
}

func AddClient(c *websocket.Conn, name string) {
	id := rand.Int63n(1<<53)
	ids[c] = id
	room.Users[id] = NewUser(id, name)
	room.Players = append(room.Players, id)

	Sending <- Message{Type: "room", Content: room}
	Sending <- Message{Type: "answers", Content: answers}
	Sending <- Message{Type: "answerTimes", Content: answerTimes}
	Sending <- Message{Type: "rule", Content: rule}
}

func RemoveClient(c *websocket.Conn) {
	id := ids[c]
	if room.Master == id {
		room.Master = -1
	} else {
		room.Players = Int64Remove(room.Players, id)
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

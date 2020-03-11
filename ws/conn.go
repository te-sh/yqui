package main

import (
	"context"
	"log"
	"time"
	"github.com/gorilla/websocket"
)

const PingInterval = 30

type Conn struct {
	Ws *websocket.Conn
	Message chan Message
}

type Message struct {
	Type string `json:"type"`
	Content interface {} `json:"content"`
}

func NewConn(ws *websocket.Conn) *Conn {
	conn := new(Conn)
	conn.Ws = ws
	conn.Message = make(chan Message)
	return conn
}

func (conn *Conn) Activate(ctx context.Context) error {
	ticker := time.NewTicker(PingInterval * time.Second)
	defer ticker.Stop()

	for {
		select {
		case message := <-conn.Message:
			err := conn.Ws.WriteJSON(message)
			if err != nil {
				log.Println("err write: ", err)
				return err
			}
		case <-ticker.C:
			err := conn.Ws.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				log.Println("err ping: ", err)
				return err
			}
		case <-ctx.Done():
			return nil
		}
	}
}

type RoomSub struct {
	Users map[int64]*User `json:"users"`
	Attendees *Attendees `json:"attendees"`
	Scores map[int64]*Score `json:"scores"`
	Buttons *Buttons `json:"buttons"`
}

func (room *Room) SendRoom() {
	roomSub := RoomSub{
		Users: room.Users,
		Attendees: room.Attendees,
		Scores: room.Scores,
		Buttons: room.Buttons,
	}
	room.Broadcast("room", roomSub)
}

func (room *Room) SendAttendees() {
	room.Broadcast("attendees", room.Attendees)
}

func (room *Room) SendButtons() {
	room.Broadcast("buttons", room.Buttons)
}

func (room *Room) SendScores() {
	subScores := make(map[int64]*Score)
	for id := range room.Scores {
		subScore := *room.Scores[id]
		if !room.Rule.ShowPoint {
			subScore.Point = 0
			subScore.Batsu = 0
		}
		subScores[id] = &subScore
	}

	room.SendToMaster("scores", room.Scores)
	room.SendToPlayers("scores", subScores)
}

func (room *Room) Broadcast(typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	msg := Message{Type: typ, Content: cnt}
	for id := range room.Users {
		room.Users[id].Conn.Message <- msg
	}
}

func (room *Room) SendToOne(id int64, typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	msg := Message{Type: typ, Content: cnt}
	room.Users[id].Conn.Message <- msg
}

func (room *Room) SendToMaster(typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	if id := room.Attendees.Master; id != -1 {
		msg := Message{Type: typ, Content: cnt}
		room.Users[id].Conn.Message <- msg
	}
}

func (room *Room) SendToPlayers(typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	msg := Message{Type: typ, Content: cnt}
	for id := range room.Users {
		if id != room.Attendees.Master {
			room.Users[id].Conn.Message <- msg
		}
	}
}

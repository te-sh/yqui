package main

import (
	"context"
	"github.com/gorilla/websocket"
	"log"
	"time"
)

const PingInterval = 30

type Conn struct {
	Ws      *websocket.Conn
	Message chan Message
}

type Message struct {
	Type    string      `json:"type"`
	Content interface{} `json:"content"`
}

func NewConn(ws *websocket.Conn) *Conn {
	conn := new(Conn)
	conn.Ws = ws
	conn.Message = make(chan Message)
	return conn
}

func (conn *Conn) Activate(ctx context.Context) error {
	defer LogPanic()

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

type RoomSummary struct {
	NumUsers int `json:"numUsers"`
}

func makeRoomsSend(rooms [numRooms]*Room) [numRooms]*RoomSummary {
	var roomsSend [numRooms]*RoomSummary
	for i, room := range rooms {
		roomSummary := RoomSummary{
			NumUsers: len(room.Users),
		}
		roomsSend[i] = &roomSummary
	}
	return roomsSend
}

func (conn *Conn) SendSelfID(id int64) {
	msg := Message{"selfID", id}
	conn.Message <- msg
	LogJson("write", msg)
}

func (conns Conns) SendRooms(rooms [numRooms]*Room) {
	msg := Message{"rooms", makeRoomsSend(rooms)}
	for _, conn := range conns {
		conn.Message <- msg
	}
	LogJson("write", msg)
}

func (conn *Conn) SendRooms(rooms [numRooms]*Room) {
	msg := Message{"rooms", makeRoomsSend(rooms)}
	conn.Message <- msg
	LogJson("write", msg)
}

func (conn *Conn) SendJoined(roomNo int) {
	msg := Message{"joined", roomNo}
	conn.Message <- msg
	LogJson("write", msg)
}

func (room *Room) Broadcast(typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	for _, user := range room.Users {
		user.Conn.Message <- msg
	}
	LogJson("write", msg)
}

func (room *Room) SendToOne(id int64, typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	if user, ok := room.Users[id]; ok {
		user.Conn.Message <- msg
	}
	LogJson("write", msg)
}

func (room *Room) SendToMaster(typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	if user := room.Users.Master(); user != nil {
		user.Conn.Message <- msg
	}
	LogJson("write", msg)
}

func (room *Room) SendToPlayers(typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	for _, user := range room.Users {
		if !user.IsMaster {
			user.Conn.Message <- msg
		}
	}
	LogJson("write", msg)
}

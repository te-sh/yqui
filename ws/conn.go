package main

import (
	"context"
	"github.com/gorilla/websocket"
	"time"
)

const PingInterval = 30

type Conn struct {
	Ws      *websocket.Conn
	Cmd     chan Cmd
	Message chan Message
	Close   chan int
}

type Message struct {
	Type    string      `json:"type"`
	Content interface{} `json:"content"`
}

func NewConn(ws *websocket.Conn) *Conn {
	conn := new(Conn)
	conn.Ws = ws
	conn.Cmd = make(chan Cmd)
	conn.Message = make(chan Message)
	conn.Close = make(chan int)
	return conn
}

func (conn *Conn) ActivateReader() error {
	defer LogPanic()

	var cmd Cmd
	for {
		err := conn.Ws.ReadJSON(&cmd)
		if err != nil {
			LogWrite("err", "read ws", err)
			conn.Close <- 0
			return nil
		}
		conn.Cmd <- cmd
	}
}

func (conn *Conn) ActivateWriter(ctx context.Context) error {
	defer LogPanic()

	ticker := time.NewTicker(PingInterval * time.Second)
	defer ticker.Stop()

	for {
		select {
		case message := <-conn.Message:
			err := conn.Ws.WriteJSON(message)
			if err != nil {
				LogWrite("err", "write ws", err)
				conn.Close <- 0
				return err
			}
		case <-ticker.C:
			err := conn.Ws.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				LogWrite("err", "ping ws", err)
				conn.Close <- 0
				return err
			}
		case <-ctx.Done():
			return nil
		}
	}
}

func (conn *Conn) SendSelfID(id int64) {
	msg := Message{"selfID", id}
	LogJson("write", "selfID", msg)
	conn.Message <- msg
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

func (conns Conns) SendRooms(rooms [numRooms]*Room) {
	msg := Message{"rooms", makeRoomsSend(rooms)}
	for _, conn := range conns {
		conn.Message <- msg
	}
	LogJson("write", "rooms", msg)
}

func (conn *Conn) SendRooms(rooms [numRooms]*Room) {
	msg := Message{"rooms", makeRoomsSend(rooms)}
	LogJson("write", "rooms", msg)
	conn.Message <- msg
}

func (conn *Conn) SendJoined(roomNo int) {
	msg := Message{"joined", roomNo}
	LogJson("write", "joined", msg)
	conn.Message <- msg
}

func (room *Room) Broadcast(typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	for _, user := range room.Users {
		user.Conn.Message <- msg
	}
}

func (room *Room) SendToOne(id int64, typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	if user, ok := room.Users[id]; ok {
		user.Conn.Message <- msg
	}
}

func (room *Room) SendToMaster(typ string, cnt interface{}) {
	msg := Message{Type: typ, Content: cnt}
	if user := room.Users.Master(); user != nil {
		user.Conn.Message <- msg
	}
}

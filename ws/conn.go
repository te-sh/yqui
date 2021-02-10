package main

import (
	"context"
	"github.com/gorilla/websocket"
	"time"
)

const PingInterval = 30

type Conn struct {
	ID        int64
	IpAddress string
	Ws        *websocket.Conn
	Cmd       chan Cmd
	Message   chan Message
	Close     chan int
}

type Message struct {
	Type    string      `json:"type"`
	Content interface{} `json:"content"`
}

func NewConn(id int64, ipAddress string, ws *websocket.Conn) *Conn {
	conn := new(Conn)
	conn.ID = id
	conn.IpAddress = ipAddress
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
			LogError("read", Log{Conn: conn, Error: err})
			conn.Close <- 0
			return nil
		}

		LogInfo("read", Log{Conn: conn, Json: cmd})
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
				LogError("write", Log{Conn: conn, Error: err})
				conn.Close <- 0
				return err
			}
		case <-ticker.C:
			err := conn.Ws.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				LogError("ping", Log{Conn: conn, Error: err})
				conn.Close <- 0
				return err
			}
		case <-ctx.Done():
			return nil
		}
	}
}

func SendToOne(id int64, typ string, content interface{}, log bool) {
	message := Message{Type: typ, Content: content}
	if conn, ok := mapper.GetConn(id); ok {
		if log {
			LogInfo("write", Log{Conn: conn, Message: typ, Json: content})
		}
		conn.Message <- message
	}
}

func SendToOnes(ids []int64, typ string, content interface{}, log bool) {
	message := Message{Type: typ, Content: content}
	if log {
		LogInfo("write", Log{Message: typ, Json: content})
	}
	for _, id := range ids {
		if conn, ok := mapper.GetConn(id); ok {
			conn.Message <- message
		}
	}
}

func SendToAll(typ string, content interface{}, log bool) {
	message := Message{Type: typ, Content: content}
	if log {
		LogInfo("write", Log{Message: typ, Json: content})
	}
	for _, conn := range mapper.GetConns() {
		conn.Message <- message
	}
}

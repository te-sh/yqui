package main

import (
	"context"
	"github.com/gorilla/websocket"
	"sync"
	"time"
)

const PingInterval = 30

type Conn struct {
	ID        int64
	IpAddress string
	Ws        *websocket.Conn
	Receive   chan Cmd
	CloseOnce sync.Once
	Send      chan Send
}

type Send struct {
	Type    string      `json:"type"`
	Content interface{} `json:"content"`
}

func NewConn(id int64, ipAddress string, ws *websocket.Conn) *Conn {
	conn := new(Conn)
	conn.ID = id
	conn.IpAddress = ipAddress
	conn.Ws = ws
	conn.Receive = make(chan Cmd)
	conn.Send = make(chan Send)
	return conn
}

func (conn *Conn) ActivateReader() error {
	defer LogPanic()

	var cmd Cmd
	for {
		err := conn.Ws.ReadJSON(&cmd)
		if err != nil {
			LogError("read", Log{Conn: conn, Error: err})
			conn.CloseRead()
			return nil
		}

		LogInfo("read", Log{Conn: conn, Json: cmd})
		conn.Receive <- cmd
	}
}

func (conn *Conn) CloseRead() {
	conn.CloseOnce.Do(func() {
		close(conn.Receive)
	})
}

func (conn *Conn) ActivateWriter(ctx context.Context) error {
	defer LogPanic()

	ticker := time.NewTicker(PingInterval * time.Second)
	defer ticker.Stop()

	for {
		select {
		case message := <-conn.Send:
			err := conn.Ws.WriteJSON(message)
			if err != nil {
				LogError("write", Log{Conn: conn, Error: err})
				conn.CloseRead()
				return err
			}
		case <-ticker.C:
			err := conn.Ws.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				LogError("ping", Log{Conn: conn, Error: err})
				conn.CloseRead()
				return err
			}
		case <-ctx.Done():
			return nil
		}
	}
}

func SendToOne(id int64, typ string, content interface{}, log bool) {
	send := Send{Type: typ, Content: content}
	if conn, ok := mapper.GetConn(id); ok {
		if log {
			LogInfo("write", Log{Conn: conn, Message: typ, Json: content})
		}
		conn.Send <- send
	}
}

func SendToOnes(ids []int64, typ string, content interface{}, log bool) {
	send := Send{Type: typ, Content: content}
	if log {
		LogInfo("write", Log{Message: typ, Json: content})
	}
	for _, id := range ids {
		if conn, ok := mapper.GetConn(id); ok {
			conn.Send <- send
		}
	}
}

func SendToAll(typ string, content interface{}, log bool) {
	send := Send{Type: typ, Content: content}
	if log {
		LogInfo("write", Log{Message: typ, Json: content})
	}
	for _, conn := range mapper.GetConns() {
		conn.Send <- send
	}
}

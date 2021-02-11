package main

import (
	"context"
	"github.com/gorilla/websocket"
	"time"
)

const SendChannelCapacity = 64
const PingInterval = 30

type Conn struct {
	ID        int64
	IpAddress string
	Ws        *websocket.Conn
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
	conn.Send = make(chan Send, SendChannelCapacity)
	return conn
}

func (conn *Conn) ActivateWriter(ctx context.Context) {
	defer LogPanic()

	ticker := time.NewTicker(PingInterval * time.Second)
	defer ticker.Stop()

LOOP:
	for {
		select {
		case message := <-conn.Send:
			err := conn.Ws.WriteJSON(message)
			if err != nil {
				LogInfo("write", Log{Conn: conn, Error: err})
			}
		case <-ticker.C:
			err := conn.Ws.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				LogInfo("ping", Log{Conn: conn, Error: err})
			}
		case <-ctx.Done():
			break LOOP
		}
	}
}

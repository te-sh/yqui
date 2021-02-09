package main

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type Conns map[int64]*Conn

const numRooms = 16

var rooms = [numRooms]*Room{
	NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(),
	NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom(),
}
var id2room = make(map[int64]*Room)
var id2conn = make(Conns)
var Received = make(chan Cmd)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func JoinUser(id int64, conn *Conn, cmd Cmd) {
	LogError("join user", errors.New("join room"), id)
	var join Join
	json.Unmarshal(cmd.A, &join)
	if join.RoomNo < 0 || join.RoomNo >= len(rooms) {
		LogError("join user", errors.New("roon No is invalid"), id)
		return
	}

	room := rooms[join.RoomNo]
	if room == nil {
		LogError("join user", errors.New("room does not exist"), id)
		return
	}

	id2room[id] = room
	room.JoinUser(id, conn, join, NowMilliSec())
	room.SendRoom()
	conn.SendJoined(join.RoomNo)
	id2conn.SendRooms(rooms)
}

func LeaveUser(id int64) {
	LogError("leave user", errors.New("leave room"), id)
	if room, ok := id2room[id]; ok {
		delete(id2room, id)
		room.LeaveUser(id, NowMilliSec())
		room.SendRoom()
		id2conn.SendRooms(rooms)
	}
}

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	defer LogPanic()

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		LogError("upgrade", err, -1)
		return
	}
	defer c.Close()

	id := NewID()
	conn := NewConn(c, id)
	LogError("connect", errors.New("connect"), id)

	ctx := context.Background()
	go conn.ActivateReader()
	cctx, cancelConn := context.WithCancel(ctx)
	go conn.ActivateWriter(cctx)
	defer cancelConn()

	id2conn[id] = conn
	defer delete(id2conn, id)

	c.SetCloseHandler(func(code int, text string) error {
		LogError("close ws", errors.New("close handler is called"), id)
		conn.Close <- 0
		return nil
	})

	conn.SendSelfID(id)
	conn.SendRooms(rooms)

	for {
		select {
		case cmd := <-conn.Cmd:
			LogJson("read", "from "+r.Header.Get("X-Real-IP"), cmd)

			switch cmd.C {
			case "join":
				JoinUser(id, conn, cmd)
				defer LeaveUser(id)
			case "leave":
				LeaveUser(id)
			default:
				cmd.ID = id
				cmd.Time = NowMilliSec()
				Received <- cmd
			}
		case <-conn.Close:
			LogError("close", errors.New("exit HandleConnection"), id)
			return
		}
	}
}

func main() {
	LogInit()
	SetRandSeed()
	go HandleMessage()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

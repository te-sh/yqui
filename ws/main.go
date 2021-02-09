package main

import (
	"context"
	"encoding/json"
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
	var join Join
	json.Unmarshal(cmd.A, &join)
	if 0 <= join.RoomNo && join.RoomNo < len(rooms) {
		if room := rooms[join.RoomNo]; room != nil {
			id2room[id] = room
			room.JoinUser(id, conn, join, NowMilliSec())
			room.SendRoom()
			conn.SendJoined(join.RoomNo)
			id2conn.SendRooms(rooms)
		}
	}
}

func LeaveUser(id int64) {
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
		log.Println("err upgrade: ", err)
		return
	}
	defer c.Close()

	ctx := context.Background()

	conn := NewConn(c)
	go conn.ActivateReader()
	cctx, cancelConn := context.WithCancel(ctx)
	go conn.ActivateWriter(cctx)
	defer cancelConn()

	id := NewID()
	id2conn[id] = conn
	defer delete(id2conn, id)

	close := make(chan int)
	c.SetCloseHandler(func(code int, text string) error {
		log.Println("close: ", text)
		close <- 0
		return nil
	})

	conn.SendSelfID(id)
	conn.SendRooms(rooms)

	for {
		select {
		case cmd := <-conn.Cmd:
			LogJson("received from "+r.Header.Get("X-Real-IP"), cmd)

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
		case <-close:
			log.Println("exit HandleConnection")
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

package main

import (
	"context"
	"log"
	"encoding/json"
	"net/http"
	"github.com/gorilla/websocket"
)

type Conns map[int64]*Conn

const numRooms = 5
var rooms = [numRooms]*Room{NewRoom(), NewRoom(), NewRoom(), NewRoom(), NewRoom()}
var id2room = make(map[int64]*Room)
var id2conn = make(Conns)
var Received = make(chan Cmd)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Join struct {
	RoomNo int `json:"roomNo"`
	Name string `json:"name"`
}

func JoinUser(id int64, conn *Conn, cmd Cmd) {
	var join Join
	json.Unmarshal(cmd.A, &join)
	if 0 <= join.RoomNo && join.RoomNo < len(rooms) {
		if room := rooms[join.RoomNo]; room != nil {
			id2room[id] = room
			room.JoinUser(id, conn, join.Name, NowMilliSec())
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
	cctx, cancelConn := context.WithCancel(ctx)
	go conn.Activate(cctx)
	defer cancelConn()

	c.SetCloseHandler(func(code int, text string) error {
		log.Println("close: ", text)
		return nil
	})

	id := NewID()
	id2conn[id] = conn
	defer delete(id2conn, id)

	conn.SendSelfID(id)
	conn.SendRooms(rooms)

	for {
		var cmd Cmd
		err := c.ReadJSON(&cmd)
		if err != nil {
			log.Println("err read: ", err)
			break
		}
		LogJson("received", cmd)

		switch (cmd.C) {
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
	}
}

func main() {
	LogInit()
	SetRandSeed()
	go HandleMessage()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

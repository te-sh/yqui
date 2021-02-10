package main

import (
	"context"
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var mapper = NewMapper()

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func JoinUser(conn *Conn, cmd Cmd) {
	LogInfo("join user", Log{Conn: conn})
	var join Join
	json.Unmarshal(cmd.A, &join)
	if join.RoomNo < 0 || join.RoomNo >= len(rooms) {
		LogError("join user", Log{Conn: conn, Message: "roon No is invalid"})
		return
	}

	room := rooms[join.RoomNo]
	if room == nil {
		LogError("join user", Log{Conn: conn, Message: "room does not exist"})
		return
	}

	mapper.RegisterRoom(conn.ID, room)
	room.JoinUser(conn, join, NowMilliSec())
	room.SendRoom()
	SendToOne(conn.ID, "joined", join.RoomNo)
	SendToAll("rooms", rooms.MakeSummary())
}

func LeaveUser(conn *Conn) {
	LogInfo("leave user", Log{Conn: conn})
	if room, ok := mapper.GetRoom(conn.ID); ok {
		mapper.UnregisterRoom(conn.ID)
		room.LeaveUser(conn, NowMilliSec())
		room.SendRoom()
		SendToAll("rooms", rooms.MakeSummary())
	}
}

func HandleConnection(w http.ResponseWriter, r *http.Request) {
	defer LogPanic()

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		LogError("upgrade", Log{Error: err})
		return
	}
	defer c.Close()

	id := NewID()
	conn := NewConn(id, r.Header.Get("X-Real-IP"), c)
	LogInfo("connect", Log{Conn: conn})

	mapper.RegisterConn(id, conn)
	defer mapper.UnregisterConn(id)

	ctx := context.Background()
	go conn.ActivateReader()
	cctx, cancelConn := context.WithCancel(ctx)
	go conn.ActivateWriter(cctx)
	defer cancelConn()

	c.SetCloseHandler(func(code int, text string) error {
		LogInfo("close handler", Log{Conn: conn})
		conn.Close <- 0
		return nil
	})

	SendToOne(id, "selfID", id)
	SendToOne(id, "rooms", rooms.MakeSummary())

	for {
		select {
		case cmd := <-conn.Cmd:
			switch cmd.C {
			case "join":
				JoinUser(conn, cmd)
				defer LeaveUser(conn)
			case "leave":
				LeaveUser(conn)
			default:
				cmd.ID = id
				cmd.Time = NowMilliSec()
				Command <- cmd
			}
		case <-conn.Close:
			LogInfo("close", Log{Conn: conn, Message: "exit HandleConnection"})
			return
		}
	}
}

func main() {
	LogInit()
	SetRandSeed()
	go HandleCommand()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

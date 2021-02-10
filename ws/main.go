package main

import (
	"context"
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
		LogInfo("close handler", Log{Conn: conn, Message: text})
		conn.CloseRead()
		return nil
	})

	SendToOne(id, "selfID", id, true)
	SendToOne(id, "rooms", rooms.MakeSummary(), true)

	for cmd := range conn.Receive {
		cmd.ID = id
		cmd.Time = NowMilliSec()

		switch cmd.C {
		case "join":
			JoinUser(conn, cmd)
		default:
			Command <- cmd
		}
	}

	Command <- Cmd{C: "leave", ID: id, Time: NowMilliSec()}
	LogInfo("finish", Log{Conn: conn, Message: "exit HandleConnection"})
}

func main() {
	LogInit()
	SetRandSeed()
	go HandleCommand()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

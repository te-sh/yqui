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
		LogError("upgrade to websocket", Log{Error: err})
		return
	}
	defer c.Close()

	id := NewID()
	conn := NewConn(id, r.Header.Get("X-Real-IP"), c)
	LogInfo("connect websocket", Log{Conn: conn})

	mapper.RegisterConn(id, conn)
	defer mapper.UnregisterConn(id)

	ctx := context.Background()
	cctx, cancelConn := context.WithCancel(ctx)
	go conn.ActivateWriter(cctx)
	defer cancelConn()

	c.SetCloseHandler(func(code int, text string) error {
		LogInfo("websocket close handler", Log{Conn: conn, Message: text})
		return nil
	})

	SendToOne(id, nil, "selfID", id, true)
	SendToOne(id, nil, "rooms", rooms.MakeSummary(), true)

LOOP:
	for {
		var cmd Cmd
		err := conn.Ws.ReadJSON(&cmd)
		if err != nil {
			LogInfo("receive from websocket", Log{Conn: conn, Error: err})
			break LOOP
		}
		cmd.ID = id
		cmd.Time = NowMilliSec()
		LogInfo("receive from websocket", Log{Conn: conn, Json: cmd})
		Command <- cmd
	}

	Command <- Cmd{C: "leave", ID: id, Time: NowMilliSec()}
}

func main() {
	LogInit()
	SetRandSeed()
	go HandleCommand()

	http.HandleFunc("/", HandleConnection)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

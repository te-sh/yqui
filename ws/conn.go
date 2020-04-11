package main

import (
	"context"
	"log"
	"time"
	"github.com/gorilla/websocket"
)

const PingInterval = 30

type Conn struct {
	Ws *websocket.Conn
	Message chan Message
}

type Message struct {
	Type string `json:"type"`
	Content interface {} `json:"content"`
}

func NewConn(ws *websocket.Conn) *Conn {
	conn := new(Conn)
	conn.Ws = ws
	conn.Message = make(chan Message)
	return conn
}

func (conn *Conn) Activate(ctx context.Context) error {
	ticker := time.NewTicker(PingInterval * time.Second)
	defer ticker.Stop()

	for {
		select {
		case message := <-conn.Message:
			err := conn.Ws.WriteJSON(message)
			if err != nil {
				log.Println("err write: ", err)
				return err
			}
		case <-ticker.C:
			err := conn.Ws.WriteMessage(websocket.PingMessage, []byte{})
			if err != nil {
				log.Println("err ping: ", err)
				return err
			}
		case <-ctx.Done():
			return nil
		}
	}
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

func SendRooms(id2conn map[int64]*Conn, rooms [numRooms]*Room) {
	roomsSend := makeRoomsSend(rooms)
	for _, conn := range id2conn {
		conn.Message <- Message{"rooms", roomsSend}
	}
}

func (conn *Conn) SendRooms(rooms [numRooms]*Room) {
	roomsSend := makeRoomsSend(rooms)
	conn.Message <- Message{"rooms", roomsSend}
}

func (conn *Conn) SendJoined(roomNo int) {
	conn.Message <- Message{"joined", roomNo}
}

type RoomSend struct {
	Users map[int64]*User `json:"users"`
	UserIDs []int64 `json:"userIDs"`
	Teams Teams `json:"teams"`
	Master int64 `json:"master"`
	Scores Scores `json:"scores"`
	TeamScores Scores `json:"teamScores"`
	Buttons *Buttons `json:"buttons"`
}

func (room *Room) SendRoom() {
	roomSend := RoomSend{
		Users: room.Users,
		UserIDs: room.UserIDs,
		Teams: room.Teams,
		Master: room.Master,
		Scores: room.Scores,
		TeamScores: room.TeamScores,
		Buttons: room.Buttons,
	}
	room.Broadcast("room", roomSend)
}

func (room *Room) SendUsers() {
	room.Broadcast("users", room.Users)
}

type TeamsSend struct {
	Teams Teams `json:"teams"`
	Master int64 `json:"master"`
	Scores Scores `json:"scores"`
	TeamScores Scores `json:"teamScores"`
}

func (room *Room) SendTeams() {
	teamsSend := TeamsSend{
		Teams: room.Teams,
		Master: room.Master,
		Scores: room.Scores,
		TeamScores: room.TeamScores,
	}
	room.Broadcast("teams", teamsSend)
}

func (room *Room) SendButtons() {
	room.Broadcast("buttons", room.Buttons)
}

type ScoresSend struct {
	Scores Scores `json:"scores"`
	TeamScores Scores `json:"teamScores"`
}

func (room *Room) SendScores() {
	scoresSend := ScoresSend{
		Scores: room.Scores.Clone(),
		TeamScores: room.TeamScores.Clone(),
	}
	room.SendToMaster("scores", scoresSend)

	if !room.Rule.ShowPoint {
		for _, score := range scoresSend.Scores {
			score.Point = 0
			score.Batsu = 0
		}
		for _, teamScore := range scoresSend.TeamScores {
			teamScore.Point = 0
			teamScore.Batsu = 0
		}
	}
	room.SendToPlayers("scores", scoresSend)
}

func (room *Room) SendRule() {
	room.SendScores()
	room.Broadcast("rule", room.Rule)
}

func (room *Room) Broadcast(typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	msg := Message{Type: typ, Content: cnt}
	for id := range room.Users {
		room.Users[id].Conn.Message <- msg
	}
}

func (room *Room) SendToOne(id int64, typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	msg := Message{Type: typ, Content: cnt}
	room.Users[id].Conn.Message <- msg
}

func (room *Room) SendToMaster(typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	if id := room.Master; id != -1 {
		msg := Message{Type: typ, Content: cnt}
		room.Users[id].Conn.Message <- msg
	}
}

func (room *Room) SendToPlayers(typ string, cnt interface {}) {
	log.Println("write: ", typ, cnt)
	msg := Message{Type: typ, Content: cnt}
	for _, id := range room.UserIDs {
		if id != room.Master {
			room.Users[id].Conn.Message <- msg
		}
	}
}

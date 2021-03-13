package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/natefinch/lumberjack.v2"
	"log"
	"os"
	"runtime/debug"
)

func LogInit() {
	if os.Getenv("YQUI_ENV") == "prod" {
		project_name := os.Getenv("COMPOSE_PROJECT_NAME")
		log.SetOutput(&lumberjack.Logger{
			Filename:   "./log/" + project_name + ".log",
			MaxSize:    10,
			MaxBackups: 10,
			Compress:   true,
		})
	}
}

func LogPanic() {
	if err := recover(); err != nil {
		log.Println(err)
		log.Println(string(debug.Stack()))
		panic(err)
	}
}

type Log struct {
	Conn    *Conn
	ID      int64
	Room    *Room
	Message string
	Json    interface{}
	Error   error
}

func (content *Log) GetText() (id, ipAddress, roomNo, userName string) {
	if content.Conn != nil {
		id = fmt.Sprintf("%v", content.Conn.ID)
		ipAddress = content.Conn.IpAddress
		if room, ok := mapper.GetRoom(content.Conn.ID); ok {
			roomNo = fmt.Sprintf("Room%v", room.No)
			if user, ok := room.Users[content.Conn.ID]; ok {
				userName = user.Name
			}
		}
	} else if content.ID > 0 {
		id = fmt.Sprintf("%v", content.ID)
		if conn, ok := mapper.GetConn(content.ID); ok {
			ipAddress = conn.IpAddress
		}
		if room, ok := mapper.GetRoom(content.ID); ok {
			roomNo = fmt.Sprintf("Room%v", room.No)
			if user, ok := room.Users[content.ID]; ok {
				userName = user.Name
			}
		}
	} else if content.Room != nil {
		roomNo = fmt.Sprintf("Room%v", content.Room.No)
	}
	return
}

func (content *Log) JsonText() string {
	if content.Json != nil {
		if text, err := json.Marshal(content.Json); err == nil {
			return string(text)
		} else {
			return "JSON marshal error"
		}
	} else {
		return ""
	}
}

func (content *Log) ErrorText() string {
	if content.Error != nil {
		return content.Error.Error()
	} else {
		return ""
	}
}

func WriteLog(typ string, action string, content Log) {
	id, ipAddress, roomNo, userName := content.GetText()
	log.Printf(
		"%v : %v : %v : %v : %v : %v : %v : %v : %v",
		typ, id, ipAddress, roomNo, userName, action,
		content.Message, content.JsonText(), content.ErrorText())
}

func LogError(action string, content Log) {
	WriteLog("error", action, content)
}

func LogInfo(action string, content Log) {
	WriteLog("info", action, content)
}

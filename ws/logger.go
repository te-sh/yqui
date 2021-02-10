package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/natefinch/lumberjack.v2"
	"log"
	"os"
	"runtime/debug"
)

type Log struct {
	Conn    *Conn
	Message string
	Json    interface{}
	Error   error
}

func (content *Log) ID() string {
	if content.Conn != nil {
		return fmt.Sprintf("%v", content.Conn.ID)
	} else {
		return ""
	}
}

func (content *Log) IpAddress() string {
	if content.Conn != nil {
		return content.Conn.IpAddress
	} else {
		return ""
	}
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

func WriteLog(typ string, action string, content Log) {
	log.Printf(
		"%v : %v : %v : %v : %v : %v : %v",
		typ, content.ID(), content.IpAddress(), action,
		content.Message, content.JsonText(), content.ErrorText())
}

func LogError(action string, content Log) {
	WriteLog("error", action, content)
}

func LogInfo(action string, content Log) {
	WriteLog("info", action, content)
}

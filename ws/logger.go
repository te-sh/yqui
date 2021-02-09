package main

import (
	"encoding/json"
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
	log.Print(typ)
	log.Print(":")

	log.Print(action)
	log.Print(":")

	if content.Conn != nil {
		log.Print(content.Conn.ID)
	}
	log.Print(":")

	if content.Conn != nil {
		log.Print(content.Conn.IpAddress)
	}
	log.Print(":")

	log.Print(content.Message)
	log.Print(":")

	if content.Json != nil {
		if text, err := json.Marshal(content.Json); err == nil {
			log.Print(string(text))
		} else {
			log.Print("JSON marshal error")
		}
	}
	log.Print(":")

	if content.Error != nil {
		log.Print(content.Error)
	}
	log.Println()
}

func LogError(action string, content Log) {
	WriteLog("error", action, content)
}

func LogInfo(action string, content Log) {
	WriteLog("info", action, content)
}

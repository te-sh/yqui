package main

import (
	"encoding/json"
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

func LogJson(typ string, o interface{}) {
	if text, err := json.Marshal(o); err == nil {
		log.Println(typ, ":", string(text))
	} else {
		log.Println("JSON marshal error: ", err)
	}
}

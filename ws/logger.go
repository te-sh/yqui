package main

import (
	"os"
	"log"
	"runtime/debug"
	"encoding/json"
	"gopkg.in/natefinch/lumberjack.v2"
)

func LogInit() {
	if os.Getenv("YQUI_ENV") == "prod" {
		log.SetOutput(&lumberjack.Logger{
			Filename:   "./log/yqui.log",
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

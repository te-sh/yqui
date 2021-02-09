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

func LogWrite(act string, typ string, message interface{}) {
	log.Println(act, ":", typ, ":", message);
}

func LogError(typ string, err error, id int64) {
	LogWrite("err", typ, fmt.Sprintf("%s (id = %d)", err.Error(), id))
}

func LogJson(act string, typ string, o interface{}) {
	if text, err := json.Marshal(o); err == nil {
		LogWrite(act, typ, string(text))
	} else {
		LogError("JSON marshal", err, -1)
	}
}

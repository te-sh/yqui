package main

import (
	"log"
	"runtime/debug"
	"gopkg.in/natefinch/lumberjack.v2"
)

func LogInit() {
	log.SetOutput(&lumberjack.Logger{
		Filename:   "./log/yqui.log",
		MaxSize:    100,
		MaxBackups: 5,
		Compress:   true,
	})
}

func LogPanic() {
	if err := recover(); err != nil {
		log.Println(err)
		log.Println(string(debug.Stack()))
		panic(err)
	}
}

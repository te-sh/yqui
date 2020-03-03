package main

type Cmd struct {
	C string `json:"c"`
	A string `json:"a"`
	ID int64 `json:"-"`
	Time int64 `json:"-"`
}

type Message struct {
	Type string `json:"type"`
	Content interface {} `json:"content"`
}

type Chat struct {
	Name string `json:"name"`
	Text string `json:"text"`
	Time int64 `json:"time"`
}

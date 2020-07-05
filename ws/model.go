package main

import (
	"encoding/json"
)

type Cmd struct {
	C string `json:"c"`
	A json.RawMessage `json:"a"`
	ID int64 `json:"-"`
	Time int64 `json:"-"`
}

type Chat struct {
	Type string `json:"type"`
	Time int64 `json:"time"`
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

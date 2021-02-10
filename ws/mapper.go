package main

import "sync"

type Mapper struct {
	ID2Conn sync.Map
	ID2Room sync.Map
}

func NewMapper() *Mapper {
	mapper := new(Mapper)
	return mapper
}

func (mapper *Mapper) RegisterConn(id int64, conn *Conn) {
	mapper.ID2Conn.Store(id, conn)
}

func (mapper *Mapper) UnregisterConn(id int64) {
	mapper.ID2Conn.Delete(id)
}

func (mapper *Mapper) GetConn(id int64) (conn *Conn, ok bool) {
	_conn, _ok := mapper.ID2Conn.Load(id)
	ok = _ok
	if ok {
		conn = _conn.(*Conn)
	}
	return
}

func (mapper *Mapper) GetConns() []*Conn {
	var conns []*Conn
	mapper.ID2Conn.Range(func(_, value interface{}) bool {
		conns = append(conns, value.(*Conn))
		return true
	})
	return conns
}

func (mapper *Mapper) RegisterRoom(id int64, room *Room) {
	mapper.ID2Room.Store(id, room)
}

func (mapper *Mapper) UnregisterRoom(id int64) {
	mapper.ID2Room.Delete(id)
}

func (mapper *Mapper) GetRoom(id int64) (room *Room, ok bool) {
	_room, _ok := mapper.ID2Room.Load(id)
	ok = _ok
	if ok {
		room = _room.(*Room)
	}
	return
}

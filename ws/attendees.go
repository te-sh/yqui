package main

type Attendees struct {
	Master int64 `json:"master"`
	Players []int64 `json:"players"`
}

func NewAttendees() *Attendees {
	attendees := new(Attendees)
	attendees.Master = -1
	return attendees
}

func (attendees *Attendees) JoinUser(id int64) {
	attendees.Players = append(attendees.Players, id)
}

func (attendees *Attendees) LeaveUser(id int64) {
	if attendees.Master == id {
		attendees.Master = -1
	}
	attendees.Players = Int64Remove(attendees.Players, id)
}

func (attendees *Attendees) IsPlayer(id int64) bool {
	return Int64FindIndex(attendees.Players, id) >= 0
}

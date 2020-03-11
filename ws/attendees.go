package main

type Attendees struct {
	Master int64 `json:"master"`
	TeamGame bool `json:"teamGame"`
	Players []int64 `json:"players"`
}

func NewAttendees() *Attendees {
	attendees := new(Attendees)
	attendees.Master = -1
	attendees.TeamGame = false
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

func (attendees *Attendees) RemoveInvalid(users map[int64]*User) {
	var newPlayers []int64
	for _, id := range attendees.Players {
		if _, ok := users[id]; ok {
			newPlayers = append(newPlayers, id)
		}
	}
	attendees.Players = newPlayers
}

func (attendees *Attendees) IsPlayer(id int64) bool {
	return Int64FindIndex(attendees.Players, id) >= 0
}

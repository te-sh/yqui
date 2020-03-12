package main

import (
	"errors"
)

type Attendees struct {
	Master int64 `json:"master"`
	TeamGame bool `json:"teamGame"`
	Players []int64 `json:"players"`
	Teams [][]int64 `json:"teams"`
}

func NewAttendees() *Attendees {
	attendees := new(Attendees)
	attendees.Master = -1
	attendees.TeamGame = false
	return attendees
}

func (attendees *Attendees) JoinUser(id int64) {
	if (!attendees.TeamGame) {
		attendees.Players = append(attendees.Players, id)
	}
}

func (attendees *Attendees) LeaveUser(id int64) {
	if attendees.Master == id {
		attendees.Master = -1
	}
	attendees.Players = Int64Remove(attendees.Players, id)
	attendees.Teams = IInt64Remove(attendees.Teams, id)
}

func (attendees *Attendees) ToggleMaster(id int64) {
	if attendees.Master == id {
		attendees.Master = -1
		if (!attendees.TeamGame) {
			attendees.Players = append(attendees.Players, id)
		}
	} else if attendees.Master == -1 {
		attendees.Master = id
		attendees.Players = Int64Remove(attendees.Players, id)
		attendees.Teams = IInt64Remove(attendees.Teams, id)
	}
}

func (attendees *Attendees) RemoveInvalid(userIDs []int64) {
	attendees.Players = Int64RemoveIf(attendees.Players, func (id int64) bool {
		return Int64FindIndex(userIDs, id) < 0
	})
	attendees.Teams = IInt64RemoveIf(attendees.Teams, func (id int64) bool {
		return Int64FindIndex(userIDs, id) < 0
	})
}

func (attendees *Attendees) Team(id int64) ([]int64, error) {
	if attendees.TeamGame {
		if i, _ := IInt64FindIndex(attendees.Teams, id); i >= 0 {
			return attendees.Teams[i], nil
		} else {
			return nil, errors.New("Not a player")
		}
	} else {
		if Int64FindIndex(attendees.Players, id) >= 0 {
			return []int64{id}, nil
		} else {
			return nil, errors.New("Not a player")
		}
	}
}

func (attendees *Attendees) OtherTeams(id int64) ([][]int64, error) {
	if attendees.TeamGame {
		if i, _ := IInt64FindIndex(attendees.Teams, id); i >= 0 {
			return append(attendees.Teams[:i], attendees.Teams[i+1:]...), nil
		} else {
			return nil, errors.New("Not a player")
		}
	} else {
		if i := Int64FindIndex(attendees.Players, id); i >= 0 {
			var teams [][]int64
			for j, player := range attendees.Players {
				if i != j {
					teams = append(teams, []int64{player})
				}
			}
			return teams, nil
		} else {
			return nil, errors.New("Not a player")
		}
	}
}

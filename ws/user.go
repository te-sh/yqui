package main

import (
	"encoding/json"
)

type Users map[int64]*User

type UsersSummary struct {
	MasterName    string   `json:"masterName"`
	NumPlayers    int      `json:"numPlayers"`
	PlayerNames   []string `json:"playerNames"`
	NumObservers  int      `json:"numObservers"`
	ObserverNames []string `json:"observerNames"`
}

type User struct {
	ID          int64  `json:"id"`
	Team        *Team  `json:"-"`
	IsMaster    bool   `json:"isMaster"`
	Name        string `json:"name"`
	ChatAnswer  bool   `json:"chatAnswer"`
	BorderColor string `json:"borderColor"`
}

type Teams []*Team

type Team struct {
	ID      int64   `json:"id"`
	Players []int64 `json:"players"`
}

func NewUsersSummary(users Users) *UsersSummary {
	summary := new(UsersSummary)

	if id, ok1 := users.MasterID(); ok1 {
		if user, ok2 := users[id]; ok2 {
			summary.MasterName = user.Name
		}
	}

	playerIDs := users.PlayerIDs()
	summary.NumPlayers = len(playerIDs)
	summary.PlayerNames = []string{}
	for _, id := range playerIDs {
		if user, ok := users[id]; ok {
			summary.PlayerNames = append(summary.PlayerNames, user.Name)
		}
	}

	observerIDs := users.ObserverIDs()
	summary.NumObservers = len(observerIDs)
	summary.ObserverNames = []string{}
	for _, id := range observerIDs {
		if user, ok := users[id]; ok {
			summary.ObserverNames = append(summary.ObserverNames, user.Name)
		}
	}

	return summary
}

func NewUser(id int64, name string) *User {
	user := new(User)
	user.ID = id
	user.Team = nil
	user.IsMaster = false
	user.Name = name
	user.ChatAnswer = false
	user.BorderColor = "#ff000000"
	return user
}

func NewTeam() *Team {
	team := new(Team)
	team.ID = NewID()
	return team
}

func (user *User) Clone() *User {
	newUser := *user
	return &newUser
}

func (user *User) IsPlayer() bool {
	return !user.IsMaster && user.Team != nil
}

func (user *User) IsObserver() bool {
	return !user.IsMaster && user.Team == nil
}

func (user *User) Place() string {
	if user.IsMaster {
		return "master"
	} else if user.IsPlayer() {
		return "player"
	} else {
		return "observer"
	}
}

func (user *User) MarshalJSON() ([]byte, error) {
	type Alias User
	return json.Marshal(&struct {
		*Alias
		IsPlayer   bool `json:"isPlayer"`
		IsObserver bool `json:"isObserver"`
	}{
		Alias:      (*Alias)(user),
		IsPlayer:   user.IsPlayer(),
		IsObserver: user.IsObserver(),
	})
}

func (users Users) Update(user *User) {
	if target, ok := users[user.ID]; ok {
		target.ChatAnswer = user.ChatAnswer
		target.BorderColor = user.BorderColor
	}
}

func (users Users) IDs() []int64 {
	var ids []int64
	for _, user := range users {
		ids = append(ids, user.ID)
	}
	return ids
}

func (users Users) MasterID() (int64, bool) {
	for _, user := range users {
		if user.IsMaster {
			return user.ID, true
		}
	}
	return 0, false
}

func (users Users) PlayerIDs() []int64 {
	var ids []int64
	for _, user := range users {
		if user.IsPlayer() {
			ids = append(ids, user.ID)
		}
	}
	return ids
}

func (users Users) ObserverIDs() []int64 {
	var ids []int64
	for _, user := range users {
		if user.IsObserver() {
			ids = append(ids, user.ID)
		}
	}
	return ids
}

func (teams Teams) First() (*Team, bool) {
	if len(teams) > 0 {
		return teams[0], true
	} else {
		return nil, false
	}
}

func (teams Teams) IndexOf(target *Team) int {
	for i, team := range teams {
		if team == target {
			return i
		}
	}
	return -1
}

func (teams Teams) Removed(target *Team) Teams {
	if i := teams.IndexOf(target); i >= 0 {
		return append(teams[:i], teams[i+1:]...)
	} else {
		return teams
	}
}

func (teams Teams) AddPlayer(user *User) {
	if team, ok := teams.First(); ok {
		team.Players = append(team.Players, user.ID)
		user.Team = team
	}
}

func (teams Teams) RemovePlayer(user *User) {
	if team := user.Team; team != nil {
		user.Team.Players = Int64Remove(user.Team.Players, user.ID)
		user.Team = nil
	}
}

func (teams Teams) MergePlayersToFirst(team *Team, users Users) {
	if first, ok := teams.First(); ok {
		first.Players = append(first.Players, team.Players...)
		for _, player := range team.Players {
			if user, ok := users[player]; ok {
				user.Team = first
			}
		}
	}
}

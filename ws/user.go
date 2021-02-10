package main

type Users map[int64]*User

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

func (teams Teams) First() *Team {
	if len(teams) > 0 {
		return teams[0]
	} else {
		return nil
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
	if team := teams.First(); team != nil {
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
	if first := teams.First(); first != nil {
		first.Players = append(first.Players, team.Players...)
		for _, player := range team.Players {
			if user, ok := users[player]; ok {
				user.Team = first
			}
		}
	}
}

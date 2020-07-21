package main

type Users map[int64]*User

type User struct {
	ID int64 `json:"id"`
	Conn *Conn `json:"-"`
	Team *Team `json:"-"`
	IsMaster bool `json:"isMaster"`
	Name string `json:"name"`
	ChatAnswer bool `json:"chatAnswer"`
}

type Teams []*Team

type Team struct {
	ID int64 `json:"id"`
	Players []int64 `json:"players"`
}

func NewUser(id int64, conn *Conn, name string) *User {
	user := new(User)
	user.ID = id
	user.Conn = conn
	user.Team = nil
	user.IsMaster = false
	user.Name = name
	user.ChatAnswer = false
	return user
}

func NewTeam() *Team {
	team := new(Team)
	return team
}

func (users Users) Update(user *User) {
	if target, ok := users[user.ID]; ok {
		target.ChatAnswer = user.ChatAnswer
	}
}

func (users Users) Master() *User {
	for _, user := range users {
		if user.IsMaster {
			return user
		}
	}
	return nil
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

func (team *Team) AddPlayer(id int64) {
	team.Players = append(team.Players, id)
}

func (team *Team) RemovePlayer(id int64) {
	team.Players = Int64Remove(team.Players, id)
}

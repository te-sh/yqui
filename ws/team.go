package main

type Team struct {
	ID int64 `json:"id"`
	Players []int64 `json:"players"`
}

type Teams []*Team

func NewTeam() *Team {
	team := new(Team)
	return team
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

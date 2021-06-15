package main

type ScoreGroup struct {
	Player *ScoreSet `json:"player"`
	Team   *ScoreSet `json:"team"`
}

func NewScoreGroup() *ScoreGroup {
	sg := new(ScoreGroup)
	sg.Player = NewScoreSet()
	sg.Team = NewScoreSet()
	return sg
}

func (sg *ScoreGroup) Clone() *ScoreGroup {
	newSG := NewScoreGroup()
	newSG.Player = sg.Player.Clone()
	newSG.Team = sg.Team.Clone()
	return newSG
}

func (sg *ScoreGroup) Reset(winTimes bool) {
	sg.Player.Reset(winTimes)
	sg.Team.Reset(winTimes)
}

func (sg *ScoreGroup) Init(rule *Rule) {
	sg.Player.Init(rule.Player)
}

func (sg *ScoreGroup) SetZero() {
	sg.Player.SetZero()
	sg.Team.SetZero()
}

func (sg *ScoreGroup) Merge(newSG *ScoreGroup) {
	sg.Player.Merge(newSG.Player)
	sg.Team.Merge(newSG.Team)
}

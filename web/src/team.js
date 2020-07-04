import { shuffle, intKeys } from './util'

export const playersOfTeams = teams => (
  teams.map(team => team.players).reduce((a, c) => a.concat(c), [])
)

export const mergeEditTeam = (editTeams, users, teams, master) => {
  if (!editTeams) {
    return editTeams
  }

  let newTeams = editTeams.map(team => ({
    id: team.id,
    players: team.players.filter(id => intKeys(users).includes(id))
  }))
  newTeams = normalizeTeams(newTeams)

  let added = intKeys(users).filter(id => (
    id !== master && !playersOfTeams(newTeams).includes(id)
  ))
  newTeams[0].players.push(...added)

  return newTeams
}

export const teamsToEditTeams = (users, teams, master) => {
  let observers = intKeys(users).filter(id => (
    id !== master &&
    !teams.some(team => team.players.includes(id))
  ))

  return [{ id: -1, players: observers }, ...teams, { id: -1, players: [] }]
}

export const editTeamsToTeams = editTeams => {
  return editTeams.slice(1, -1)
}

export const normalizeTeams = teams => {
  let newTeams = teams.slice(1).filter(team => team.players.length > 0)
  return [teams[0], ...newTeams, { id: -1, players: [] }]
}

export const teamRandomAssign = (editTeams, n) => {
  let players = playersOfTeams(editTeams)
  let teams = []
  for (let i = 1; i <= n; ++i) {
    teams.push({
      id: i < editTeams.length ? editTeams[i].id : -1,
      players: []
    })
  }

  shuffle(players).forEach((id, i) => teams[i % n].players.push(id))
  return [{ id: -1, players: [] }, ...teams, { id: -1, players: [] }]
}

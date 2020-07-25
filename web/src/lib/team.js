import { normalizeArray, shuffle } from './util'

export const teamsFromJson = teams => {
  return teams.map(team => ({
    id: team.id,
    players: normalizeArray(team.players)
  }))
}

export const playersOfTeams = teams => (
  teams.map(team => team.players).reduce((a, c) => a.concat(c), [])
)

export const mergeEditTeams = (editTeams, users) => {
  if (!editTeams) {
    return editTeams
  }

  let newTeams = editTeams.map(team => ({
    id: team.id,
    players: team.players.filter(id => users.has(id))
  }))

  let added = [...users.keys()].filter(id => (
    !users.get(id).IsMaster &&
    !playersOfTeams(newTeams).includes(id)
  ))
  newTeams[0].players.push(...added)

  return newTeams
}

export const teamsToEditTeams = (users, teams) => {
  let observers = [...users.keys()].filter(id => (
    !users.get(id).IsMaster &&
    !teams.some(team => team.players.includes(id))
  ))

  return [{ id: -1, players: observers }, ...teams]
}

export const editTeamsToTeams = editTeams => {
  return editTeams.slice(1, -1)
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
  return [{ id: -1, players: [] }, ...teams]
}

import { shuffle } from './util'

export const mergeEditTeam = (editTeams, userIDs, teams, master) => {
  if (!editTeams) {
    return editTeams
  }

  let newTeams = editTeams.map(team => ({
    id: team.id,
    players: team.players.filter(id => userIDs.includes(id))
  }))
  newTeams = normalizeTeams(newTeams)

  let added = userIDs.filter(id => (
    id !== master && !newTeams.flatMap(team => team.players).includes(id)
  ))
  newTeams[0].players.push(...added)

  return newTeams
}

export const teamsToEditTeams = (userIDs, teams, master) => {
  let observers = userIDs.filter(id => (
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
  let players = editTeams.flatMap(team => team.players)
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

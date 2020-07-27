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
    !users.get(id).isMaster &&
    !playersOfTeams(newTeams).includes(id)
  ))
  newTeams[1].players.push(...added)

  return newTeams
}

export const teamsToEditTeams = (users, teams) => {
  let observers = [...users.keys()].filter(id => (
    !users.get(id).isMaster &&
    !teams.some(team => team.players.includes(id))
  ))

  return [...teams, { id: -1, players: observers }]
}

export const editTeamsToTeams = editTeams => {
  return editTeams.slice(0, -1)
}

export const changeNumTeams = (editTeams, n) => {
  const [observerTeam, teams] = [editTeams[0], editTeams.slice(1)]
  const m = teams.length
  if (n > m) {
    for (let i = m; i < n; ++i) {
      teams.push({ id: -1, players: [] })
    }
  } else if (n < m) {
    const team = teams[0]
    for (let i = n; i < m; ++i) {
      team.players = team.players.concat(teams[i].players)
    }
    teams.splice(n)
  }
  return [observerTeam, ...teams]
}

export const randomAssignToTeams = editTeams => {
  const teams = editTeams.slice(1).map(team => ({ id: team.id, players: [] }))
  const n = teams.length
  const players = playersOfTeams(editTeams)
  shuffle(players).forEach((id, i) => teams[i % n].players.push(id))
  return [{ id: -1, players: [] }, ...teams]
}

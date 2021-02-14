import { normalizeArray } from './util'

export const playersOfTeams = teams => (
  teams.map(team => team.players).reduce((a, c) => a.concat(c), [])
)

export const teamsFromJson = teams => {
  return teams.map(team => ({
    id: team.id,
    players: normalizeArray(team.players),
    observers: false
  }))
}

export const recvTeamsUpdator = ({ editTeams, dispTeams }, users, teams) => {
  if (!editTeams) {
    return {
      dispTeams: { $set: teams }
    }
  } else {
    return {
      editTeams: { $set: adjustTeamPlayers(editTeams, users) },
      dispTeams: { $set: adjustTeamPlayers(dispTeams, users) }
    }
  }
}

const adjustTeamPlayers = (teams, users) => {
  const newTeams = teams.map(team => ({
    id: team.id,
    players: team.players.filter(id => users.has(id)),
    observers: team.observers
  }))

  const added = [...users.keys()].filter(id => (
    !users.get(id).isMaster &&
    !playersOfTeams(newTeams).includes(id)
  ))
  newTeams[0].players.push(...added)

  return newTeams
}

export const setTeamsUpdator = ({ editTeams, dispTeams }) => {
  const updator = {}
  if (editTeams !== undefined) {
    updator.editTeams = { $set: editTeams }
  }
  if (dispTeams !== undefined) {
    updator.dispTeams = { $set: dispTeams }
  }
  return updator
}

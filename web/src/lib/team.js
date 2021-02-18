import { normalizeArray } from './util'

export const playersOfTeams = teams => (
  teams.map(team => team.players).reduce((a, c) => a.concat(c), [])
)

export const isInTeams = (teams, id) => (
  playersOfTeams(teams).includes(id)
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
      editTeams: { $set: adjustTeamPlayers(editTeams, users, teams) },
      dispTeams: { $set: adjustTeamPlayers(dispTeams, users, teams) }
    }
  }
}

const adjustTeamPlayers = (editTeams, users, teams) => {
  const newTeams = editTeams.map(team => ({
    id: team.id,
    players: team.players.filter(id => users.has(id)),
    observers: team.observers
  }))

  const added = [...users.keys()].filter(id => !users.get(id).isMaster && !isInTeams(newTeams, id))
  const addedPlayers = added.filter(id => isInTeams(teams, id))
  const addedObservers = added.filter(id => !isInTeams(teams, id))
  newTeams[0].players.push(...addedPlayers)
  newTeams[newTeams.length - 1].players.push(...addedObservers)

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

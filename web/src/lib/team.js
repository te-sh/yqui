import { normalizeArray } from './util'

export const playersOfTeams = teams => (
  teams.map(team => team.players).reduce((a, c) => a.concat(c), [])
)

export const teamsFromJson = teams => {
  return teams.map(team => ({
    id: team.id,
    players: normalizeArray(team.players)
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
  let newTeams = teams.map(team => ({
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

export const setTeamsUpdator = ({ editTeams, dispTeams }) => {
  let updator = {}
  if (editTeams) {
    updator.editTeams = { $set: editTeams }
  }
  if (dispTeams) {
    updator.dispTeams = { $set: dispTeams }
  }
  return updator
}

import update from 'immutability-helper'

export const mergeEditTeam = (editTeam, userIDs, attendees) => {
  if (!editTeam) {
    return editTeam
  }

  let newTeams = editTeam.teams.map(team => (
    team.filter(id => userIDs.includes(id))
  ))

  let added = userIDs.filter(id => (
    id != attendees.master && editTeam.teams.every(team => !team.includes(id))
  ))
  newTeams[1].push(...added)

  return update(editTeam, {
    teams: { $set: newTeams }
  })
}

export const attendeesToEditTeam = (userIDs, attendees) => {
  let observers = userIDs.filter(id => (
    id !== attendees.master && !attendees.players.includes(id)
  ))

  return {
    teamGame: false,
    teams: [observers, attendees.players]
  }
}

export const editTeamToAttendees = editTeam => {
  return {
    teamGame: false,
    players: editTeam.teams[1]
  }
}

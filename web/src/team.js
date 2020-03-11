import update from 'immutability-helper'

export const mergeEditTeam = (editTeam, userIDs, attendees) => {
  if (!editTeam) {
    return editTeam
  }

  let newTeams = editTeam.teams.map(team => (
    team.filter(id => userIDs.includes(id))
  ))
  if (editTeam.teamGame) {
    newTeams = normalizeTeams(newTeams)
  }

  let added = userIDs.filter(id => (
    id !== attendees.master && editTeam.teams.every(team => !team.includes(id))
  ))
  if (editTeam.teamGame) {
    newTeams[0].push(...added)
  } else {
    newTeams[1].push(...added)
  }

  return update(editTeam, {
    teams: { $set: newTeams }
  })
}

export const attendeesToEditTeam = (userIDs, attendees) => {
  let observers = userIDs.filter(id => (
    id !== attendees.master &&
    !attendees.players.includes(id) &&
    !attendees.teams.some(team => team.includes(id))
  ))

  if (attendees.teamGame) {
    return {
      teamGame: attendees.teamGame,
      teams: [observers, ...attendees.teams, []]
    }
  } else {
    return {
      teamGame: attendees.teamGame,
      teams: [observers, attendees.players]
    }
  }
}

export const editTeamToAttendees = editTeam => {
  if (editTeam.teamGame) {
    return {
      teamGame: editTeam.teamGame,
      players: null,
      teams: editTeam.teams.slice(1, -1)
    }
  } else {
    return {
      teamGame: editTeam.teamGame,
      players: editTeam.teams[1],
      teams: null
    }
  }
}

export const toggleTeamGame = (editTeam, teamGame) => {
  if (teamGame) {
    return update(editTeam, {
      teamGame: { $set: teamGame },
      teams: { $set: [editTeam.teams.flat(), []] }
    })
  } else {
    return update(editTeam, {
      teamGame: { $set: teamGame },
      teams: { $set: [editTeam.teams[0], editTeam.teams.slice(1).flat()] }
    })
  }
}

export const normalizeTeams = teams => {
  let newTeams = teams.slice(1).filter(team => team.length > 0)
  return [teams[0], ...newTeams, []]
}

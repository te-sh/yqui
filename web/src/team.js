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

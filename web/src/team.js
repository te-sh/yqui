export const attendeesToEditTeam = (users, attendees) => {
  console.log(users, attendees)
  const set = new Set()
  for (var userId in users) {
    set.add(parseInt(userId))
  }
  set.delete(attendees.master)
  for (var playerId of attendees.players) {
    set.delete(playerId)
  }
  console.log(set)
  return [Array.from(set.values()), attendees.players]
}

export const editTeamToAttendees = editTeam => {
  return {
    players: editTeam[1]
  }
}

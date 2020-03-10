const setDiff = (a, b) => {
  let d = new Set(a)
  for (var e of b) {
    d.delete(e)
  }
  return d
}

const mergeEditTeam = (editTeam, attendees) => {
  let curPlayers = new Set([...editTeam.players, ...editTeam.observers])
  let newPlayers = new Set([...attendees.players, ...attendees.observers])

  let joinedPlayers = setDiff(newPlayers, curPlayers)
  let leavedPlayers = setDiff(curPlayers, newPlayers)
}

import update from 'immutability-helper'
import { shuffle } from './util'
import { playersOfTeams } from './team'
import { sendWs, SEND_TEAMS } from './send'
import { setTeams } from '../redux/actions'
import store from '../redux/store'

export const beginEditTeams = () => {
  const { users, teams } = store.getState()
  const observers = [...users.keys()].filter(id => (
    !users.get(id).isMaster &&
    !teams.some(team => team.players.includes(id))
  ))
  const editTeams = [...teams, {
    id: -1,
    players: observers,
    observers: true
  }]

  store.dispatch(setTeams({
    dispTeams: editTeams,
    editTeams: editTeams
  }))
}

export const endEditTeams = () => {
  const teams = editTeamsToTeams()
  sendWs(SEND_TEAMS, teams)
}

export const cancelEditTeams = () => {
  const { teams } = store.getState()
  store.dispatch(setTeams({
    editTeams: null,
    dispTeams: teams
  }))
}

export const changeNumTeams = n => {
  const [teams, observersTeam] = splitEditTeams()
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
  const editTeams = [...teams, observersTeam]
  store.dispatch(setTeams({
    editTeams: editTeams,
    dispTeams: editTeams
  }))
}

export const randomAssignTeams = () => {
  const [teams, observersTeam] = splitEditTeams()
  const newTeams = teams.map(team => ({ id: team.id, players: [] }))
  const n = teams.length
  const players = playersOfTeams(teams)
  shuffle(players).forEach((id, i) => newTeams[i % n].players.push(id))
  const editTeams = [...teams, observersTeam]
  store.dispatch(setTeams({
    editTeams: editTeams,
    dispTeams: editTeams
  }))
}

const editTeamsToTeams = () => {
  const { editTeams } = store.getState()
  return editTeams.slice(0, -1)
}

const splitEditTeams = () => {
  const { editTeams } = store.getState()
  return [editTeams.slice(0, -1), editTeams.slice(-1)[0]]
}

export const movingPlayerOrder = (teamIndex, fromPlayerIndex, toPlayerIndex) => {
  const { dispTeams } = store.getState()
  const player = dispTeams[teamIndex].players[fromPlayerIndex]
  const newDispTeams = update(dispTeams, {
    [teamIndex]: {
      $splice: [[fromPlayerIndex, 1], [toPlayerIndex, 0, player]]
    }
  })
  store.dispatch(setTeams({
    dispTeams: newDispTeams
  }))
}

export const movedPlayerOrder = () => {
  const { dispTeams, editTeams } = store.getState()
  if (!editTeams) {
    sendWs(SEND_TEAMS, dispTeams)
  } else {
    store.dispatch({
      editTeams: dispTeams
    })
  }
}

export const movePlayerTeam = (fromTeamIndex, fromPlayerIndex, toTeamIndex) => {
  const { editTeams } = store.getState()

  if (!editTeams) {
    return
  }

  const player = editTeams[fromTeamIndex].players[fromPlayerIndex]
  const newEditTeams = update(editTeams, {
    [fromTeamIndex]: {
      players: { $splice: [[fromPlayerIndex, 1]] }
    },
    [toTeamIndex]: {
      players: { $push: [player] }
    }
  })
  store.dispatch(setTeams({
    editTeams: newEditTeams,
    dispTeams: newEditTeams
  }))
}

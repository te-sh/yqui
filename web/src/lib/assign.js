import update from 'immutability-helper'
import { shuffle } from './util'
import { playersOfTeams, isInTeams } from './team'
import { sendWs, TEAMS } from './send'
import { setTeams } from '../redux/actions'
import store from '../redux/store'

export const beginAssign = () => {
  const { users, teams } = store.getState()
  const observers = [...users.keys()].filter(id => !users.get(id).isMaster && !isInTeams(teams, id))
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

export const endAssign = () => {
  const teams = splitEditTeams()[0]
  store.dispatch(setTeams({ editTeams: null }))
  sendWs(TEAMS, teams)
}

export const cancelAssign = () => {
  const { teams } = store.getState()
  store.dispatch(setTeams({ editTeams: null, dispTeams: teams }))
}

export const changeNumTeams = n => {
  const [teams, observersTeam] = splitEditTeams()
  const m = teams.length
  if (n > m) {
    for (let i = m; i < n; ++i) {
      teams.push({ id: -1, players: [], observers: false })
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
  const editTeams = [...newTeams, observersTeam]
  store.dispatch(setTeams({
    editTeams: editTeams,
    dispTeams: editTeams
  }))
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
      players: { $splice: [[fromPlayerIndex, 1], [toPlayerIndex, 0, player]] }
    }
  })
  store.dispatch(setTeams({
    dispTeams: newDispTeams
  }))
}

export const movedPlayerOrder = () => {
  const { dispTeams, editTeams } = store.getState()
  if (!editTeams) {
    sendWs(TEAMS, dispTeams)
  } else {
    store.dispatch(setTeams({
      editTeams: dispTeams
    }))
  }
}

export const cancelMovePlayerOrder = () => {
  const { teams, editTeams } = store.getState()
  store.dispatch(setTeams({
    dispTeams: !editTeams ? teams : editTeams
  }))
}

export const movePlayerTeam = (fromTeamIndex, fromPlayerIndex, toTeamIndex) => {
  const { dispTeams } = store.getState()
  const player = dispTeams[fromTeamIndex].players[fromPlayerIndex]
  const newEditTeams = update(dispTeams, {
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

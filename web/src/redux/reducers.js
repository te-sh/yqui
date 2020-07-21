import update from 'immutability-helper'
import {
  RESET, SET_WEB_SOCKET, RECV_ROOMS, RECV_JOINED,
  RECV_SELF_ID, RECV_ROOM, RECV_BOARDS, RECV_BOARD_LOCK,
  RECV_BOARD, RECV_SG, RECV_BUTTONS, RECV_CHAT,
  SET_EDIT_TEAMS
} from './actions'
import { toIntMap, normalizeArray } from '../util'
import { initButtons, buttonsFromJson } from '../buttons'
import { initSg, sgFromJson } from '../score'
import { initRule } from '../rule'
import { playersOfTeams, mergeEditTeam } from '../team'

const initialState = {
  ws: null,
  rooms: [],
  roomNo: null,
  selfID: null,
  users: new Map(),
  user: null,
  master: null,
  teams: [],
  isPlayer: false,
  numPlayers: 0,
  boards: {},
  boardLock: false,
  sg: initSg,
  buttons: initButtons,
  rule: initRule,
  editTeams: null,
  chats: []
}

const normalizeTeams = teams => {
  if (teams) {
    return teams.map(team => update(team, { player: { $apply: normalizeArray } }))
  } else {
    return []
  }
}

const recvRoom = (action, state) => {
  let users = toIntMap(action.room.users)
  let teams = normalizeTeams(action.room.teams)
  let players = playersOfTeams(teams)
  return update(state, {
    users: { $set: users },
    user: { $set: users.get(state.selfID) },
    master: { $set: [...users.values()].find(user => user.isMaster) },
    teams: { $set: teams },
    isPlayer: { $set: players.includes(state.selfID) },
    numPlayers: { $set: players.length },
    sg: { $set: sgFromJson(action.room.sg) },
    buttons: { $set: buttonsFromJson(action.room.buttons) },
    rule: { $set: action.room.rule },
    editTeams: { $set: mergeEditTeam(state.editTeams, action.room.users, teams, action.room.master) }
  })
}

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
  case RESET:
    return update(initialState, {
      ws: { $set: state.ws },
      rooms: { $set: state.rooms }
    })
  case SET_WEB_SOCKET:
    return update(state, { ws: { $set: action.ws } })
  case RECV_ROOMS:
    return update(state, { rooms: { $set: action.rooms } })
  case RECV_JOINED:
    return update(state, { roomNo: { $set: action.roomNo } })
  case RECV_SELF_ID:
    return update(state, { selfID: { $set: action.selfID } })
  case RECV_ROOM:
    return recvRoom(action, state)
  case RECV_BOARDS:
    return update(state, { boards: { $set: action.boards } })
  case RECV_BOARD:
    return update(state, { boards: { $merge: { [action.board.id]: action.board } } })
  case RECV_BOARD_LOCK:
    return update(state, { boardLock: { $set: action.boardLock } })
  case RECV_SG:
    return update(state, { sg: { $set: sgFromJson(action.sg) } })
  case RECV_BUTTONS:
    return update(state, { buttons: { $set: buttonsFromJson(action.buttons) } })
  case RECV_CHAT:
    return update(state, { chats: { $push: [action.chat] } })
  case SET_EDIT_TEAMS:
    return update(state, { editTeams: { $set: action.editTeams } })
  default:
    return state
  }
}

export default yquiApp

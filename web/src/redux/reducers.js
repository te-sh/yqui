import update from 'immutability-helper'
import {
  RESET, SET_WEB_SOCKET, RECV_ROOMS, RECV_JOINED,
  RECV_SELF_ID, RECV_ROOM, RECV_BOARDS, RECV_BOARD_LOCK,
  RECV_BOARD, RECV_SG, RECV_BUTTONS, RECV_CHAT,
  SET_EDIT_TEAMS
} from './actions'
import { normalizeArray } from '../util'
import { initRule } from '../rule'
import { playersOfTeams, mergeEditTeam } from '../team'

const initialState = {
  ws: null,
  rooms: [],
  roomNo: null,
  selfID: null,
  users: {},
  teams: [],
  master: -1,
  isMaster: false,
  isPlayer: false,
  numPlayers: 0,
  boards: {},
  boardLock: false,
  sg: {
    player: {
      scores: {}
    },
    team: {
      scores: {}
    }
  },
  buttons: {
    pushers: [],
    pusherTimes: [],
    answerers: [],
    right: -1
  },
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

const normalizeButtons = buttons => {
  return update(buttons, {
    pushers: { $apply: normalizeArray },
    pushTimes: { $apply: normalizeArray },
    answerers: { $apply: normalizeArray }
  })
}

const recvRoom = (action, state) => {
  let teams = normalizeTeams(action.room.teams)
  let players = playersOfTeams(teams)
  return update(state, {
    users: { $set: action.room.users },
    teams: { $set: teams },
    master: { $set: action.room.master },
    isMaster: { $set: state.selfID === action.room.master },
    isPlayer: { $set: players.includes(state.selfID) },
    numPlayers: { $set: players.length },
    sg: { $set: action.room.sg },
    buttons: { $set: normalizeButtons(action.room.buttons) },
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
    return update(state, { sg: { $set: action.sg } })
  case RECV_BUTTONS:
    return update(state, { buttons: { $set: normalizeButtons(action.buttons) } })
  case RECV_CHAT:
    return update(state, { chats: { $push: [action.chat] } })
  case SET_EDIT_TEAMS:
    return update(state, { editTeams: { $set: action.editTeams } })
  default:
    return state
  }
}

export default yquiApp

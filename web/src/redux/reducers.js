import update from 'immutability-helper'
import {
  RESET, SET_WEB_SOCKET, RECV_ROOMS, RECV_JOINED,
  RECV_SELF_ID, RECV_ROOM, RECV_BOARDS, RECV_BOARD_LOCK,
  RECV_BOARD, RECV_SG, RECV_BUTTONS, RECV_RULE,
  RECV_CHAT, SET_EDIT_TEAMS
} from './actions'
import {
  isMaster, isPlayer, normalizeTeams, normalizeButtons
} from '../util'
import { mergeEditTeam } from '../team'

export const initialState = {
  ws: null,
  rooms: [],
  roomNo: null,
  selfID: null,
  users: {},
  teams: [],
  master: -1,
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
  rule: {
    rightNum: 1,
    player: {
      pointCorrect: 1,
      bonusCorrect: 'none',
      pointWrong: 0,
      batsuWrong: 1,
      lockWrong: 0,
      winPoint: { active: true, value: 7 },
      losePoint: { active: false, value: 0 },
      loseBatsu: { active: true, value: 3 }
    },
    team: {
      active: false,
      shareButton: false,
      point: 'sum',
      batsu: 'sum',
      shareLock: true,
      winPoint: { active: true, value: 7 },
      losePoint: { active: false, value: 0 },
      loseBatsu: { active: true, value: 3 }
    },
    board: {
      active: false,
      pointCorrect: 1,
      applyNormal: true
    },
    showPoint: true
  },
  editTeams: null,
  chats: []
}

const yquiApp = (state = initialState, action) => {
  var teams, buttons
  switch (action.type) {
  case RESET:
    return update(initialState, {
      ws: { $set: state.ws },
      rooms: { $set: state.rooms }
    })
  case SET_WEB_SOCKET:
    return update(state, {
      ws: { $set: action.ws }
    })
  case RECV_ROOMS:
    return update(state, {
      rooms: { $set: action.rooms }
    })
  case RECV_JOINED:
    return update(state, {
      roomNo: { $set: action.roomNo }
    })
  case RECV_SELF_ID:
    return update(state, {
      selfID: { $set: action.selfID },
      isMaster: { $set: isMaster(action.selfID, state.master) },
      isPlayer: { $set: isPlayer(action.selfID, state.teams) }
    })
  case RECV_ROOM:
    teams = normalizeTeams(action.room.teams)
    buttons = normalizeButtons(action.room.buttons)
    return update(state, {
      users: { $set: action.room.users },
      teams: { $set: teams },
      master: { $set: action.room.master },
      sg: { $set: action.room.sg },
      buttons: { $set: buttons },
      isMaster: { $set: isMaster(state.selfID, action.room.master) },
      isPlayer: { $set: isPlayer(state.selfID, teams) },
      editTeams: { $set: mergeEditTeam(state.editTeams, action.room.users, teams, action.room.master) }
    })
  case RECV_BOARDS:
    return update(state, {
      boards: { $set: action.boards }
    })
  case RECV_BOARD:
    return update(state, {
      boards: { $merge: { [action.board.id]: action.board } }
    })
  case RECV_BOARD_LOCK:
    return update(state, {
      boardLock: { $set: action.boardLock }
    })
  case RECV_SG:
    return update(state, {
      sg: { $set: action.sg }
    })
  case RECV_BUTTONS:
    normalizeButtons(action.buttons)
    return update(state, {
      buttons: { $set: action.buttons }
    })
  case RECV_RULE:
    return update(state, {
      rule: { $set: action.rule }
    })
  case RECV_CHAT:
    return update(state, {
      chats: { $push: [action.chat] }
    })
  case SET_EDIT_TEAMS:
    return update(state, {
      editTeams: { $set: action.editTeams }
    })
  default:
    return state
  }
}

export default yquiApp

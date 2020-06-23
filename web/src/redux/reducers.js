import update from 'immutability-helper'
import {
  RESET, SET_WEB_SOCKET, RECV_ROOMS, RECV_JOINED,
  RECV_SELF_ID, RECV_ROOM, RECV_USERS, RECV_TEAMS,
  RECV_BOARDS, RECV_BOARD_LOCK, RECV_BOARD, RECV_SCORES,
  RECV_BUTTONS, RECV_RULE, RECV_CHAT, SET_EDIT_TEAMS
} from './actions'
import {
  isMaster, isPlayer, normalizeTeams, normalizeButtons, ruleText
} from '../util'
import { mergeEditTeam } from '../team'

const initialState = {
  ws: null,
  rooms: [],
  roomNo: null,
  selfID: null,
  users: {},
  userIDs: [],
  teams: [],
  master: -1,
  boards: {},
  boardLock: false,
  scores: {},
  teamScores: {},
  buttons: {
    pushers: [],
    pusherTimes: [],
    answerers: [],
    right: -1
  },
  rule: {
    rightNum: 1,
    pointCorrect: 1,
    bonusCorreact: 'none',
    pointWrong: 0,
    batsuWrong: 1,
    lockWrong: 0,
    winPoint: { active: true, value: 7 },
    losePoint: { active: false, value: 0 },
    loseBatsu: { active: true, value: 3 },
    showPoint: true,
    shareButtons: false,
    teamPoint: 'sum',
    teamBatsu: 'sum',
    teamWinPoint: { active: true, value: 7 },
    teamLosePoint: { active: false, value: 0 },
    teamLoseBatsu: { active: true, value: 3 },
    board: false,
    boardPointCorrect: 1,
    boardApplyNormal: true
  },
  ruleText: {},
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
      userIDs: { $set: action.room.userIDs },
      teams: { $set: teams },
      master: { $set: action.room.master },
      scores: { $set: action.room.scores },
      teamScores: { $set: action.room.teamScores },
      buttons: { $set: buttons },
      isMaster: { $set: isMaster(state.selfID, action.room.master) },
      isPlayer: { $set: isPlayer(state.selfID, teams) },
      ruleText: { $set: ruleText(state.rule, teams) },
      editTeams: { $set: mergeEditTeam(state.editTeams, action.room.userIDs, teams, action.room.master) }
    })
  case RECV_USERS:
    return update(state, {
      users: { $set: action.users }
    })
  case RECV_TEAMS:
    teams = normalizeTeams(action.teams.teams)
    return update(state, {
      teams: { $set: teams },
      master: { $set: action.teams.master },
      scores: { $set: action.teams.scores },
      teamScores: { $set: action.teams.teamScores },
      isMaster: { $set: isMaster(state.selfID, action.teams.master) },
      isPlayer: { $set: isPlayer(state.selfID, teams) },
      ruleText: { $set: ruleText(state.rule, teams) }
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
  case RECV_SCORES:
    return update(state, {
      scores: { $set: action.scores.scores },
      teamScores: { $set: action.scores.teamScores }
    })
  case RECV_BUTTONS:
    normalizeButtons(action.buttons)
    return update(state, {
      buttons: { $set: action.buttons }
    })
  case RECV_RULE:
    return update(state, {
      rule: { $set: action.rule },
      ruleText: { $set: ruleText(action.rule, state.teams) }
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

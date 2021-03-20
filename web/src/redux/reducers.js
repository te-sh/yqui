import update from 'immutability-helper'
import {
  SET_MOBILE, RESET, SET_WEB_SOCKET, RECV_SELF_ID, RECV_ROOMS,
  TOGGLE_SHOW_LEFT, RECV_ROOM, RECV_RULE, RECV_BG, RECV_BOARD,
  RECV_SG, RECV_BUTTONS, RECV_TIMER, RECV_CHAT, SET_TEAMS,
  SET_BOARD, ADD_EDIT_BOARD, REMOVE_EDIT_BOARD, CLEAR_EDIT_BOARDS,
  SET_OPEN_TAG, SET_OPEN_RULE, SET_OPEN_SETTING, SET_OPEN_HELP, SET_OPEN_LEAVE,
  SET_ALERT
} from './actions'
import { initUsers, initUser, usersFromJson, findMaster } from '../lib/user'
import { initBg, mergeBgWithJson } from '../lib/board'
import { initSg, mergeSgWithJson } from '../lib/score'
import { initButtons, buttonsFromJson } from '../lib/buttons'
import { initRule } from '../lib/rule'
import {
  playersOfTeams, teamsFromJson, recvTeamsUpdator, setTeamsUpdator
} from '../lib/team'

const initialState = {
  mobile: false,
  ws: null,
  selfID: null,
  rooms: [],
  showLeft: true,
  roomNo: null,
  tag: {
    title: '',
    password: ''
  },
  users: initUsers,
  user: initUser,
  master: null,
  isPlayer: false,
  numPlayers: 0,
  teams: [],
  bg: initBg,
  sg: initSg,
  buttons: initButtons,
  rule: initRule,
  timer: {
    running: false,
    remaining: 0
  },
  editBoards: new Set(),
  chats: [],
  editTeams: null,
  dispTeams: [],
  open: {
    tag: false,
    rule: false,
    setting: false,
    help: false,
    leave: false
  },
  dialog: {
    alert: null
  }
}

const recvRoom = (action, state) => {
  const users = usersFromJson(action.room.users)
  const teams = teamsFromJson(action.room.teams)
  const players = playersOfTeams(teams)
  return update(state, {
    roomNo: { $set: action.room.no },
    tag: { $set: action.room.tag },
    users: { $set: users },
    user: { $set: users.get(state.selfID) },
    master: { $set: findMaster(users) },
    isPlayer: { $set: players.includes(state.selfID) },
    numPlayers: { $set: players.length },
    teams: { $set: teams },
    buttons: { $set: buttonsFromJson(action.room.buttons) },
    ...recvTeamsUpdator(state, users, teams)
  })
}

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOBILE:
      return update(state, { mobile: { $set: action.mobile } })
    case RESET:
      return update(initialState, {
        mobile: { $set: state.mobile },
        ws: { $set: state.ws },
        selfID: { $set: state.selfID },
        rooms: { $set: state.rooms }
      })
    case SET_WEB_SOCKET:
      return update(state, { ws: { $set: action.ws } })
    case RECV_SELF_ID:
      return update(state, { selfID: { $set: action.selfID } })
    case RECV_ROOMS:
      return update(state, { rooms: { $set: action.rooms } })
    case TOGGLE_SHOW_LEFT:
      return update(state, { showLeft: { $set: !state.showLeft } })
    case RECV_ROOM:
      return recvRoom(action, state)
    case RECV_RULE:
      return update(state, { rule: { $set: action.rule } })
    case RECV_BG:
      return update(state, { bg: { $set: mergeBgWithJson(state, action.bg) } })
    case RECV_BOARD:
      return update(state, { bg: { boards: { $add: [[action.board.id, action.board]] } } })
    case RECV_SG:
      return update(state, { sg: { $set: mergeSgWithJson(state, action.sg) } })
    case RECV_BUTTONS:
      return update(state, { buttons: { $set: buttonsFromJson(action.buttons) } })
    case RECV_TIMER:
      return update(state, { timer: { $set: action.timer } })
    case RECV_CHAT:
      return update(state, { chats: { $push: [action.chat] } })
    case SET_TEAMS:
      return update(state, setTeamsUpdator(action.payload))
    case SET_BOARD:
      return update(state, { bg: { boards: { $add: [[action.board.id, action.board]] } } })
    case ADD_EDIT_BOARD:
      return update(state, { editBoards: { $add: [action.board.id] } })
    case REMOVE_EDIT_BOARD:
      return update(state, { editBoards: { $remove: [action.board.id] } })
    case CLEAR_EDIT_BOARDS:
      return update(state, { editBoards: { $set: new Set() } })
    case SET_OPEN_TAG:
      return update(state, { open: { tag: { $set: action.open } } })
    case SET_OPEN_RULE:
      return update(state, { open: { rule: { $set: action.open } } })
    case SET_OPEN_SETTING:
      return update(state, { open: { setting: { $set: action.open } } })
    case SET_OPEN_HELP:
      return update(state, { open: { help: { $set: action.open } } })
    case SET_OPEN_LEAVE:
      return update(state, { open: { leave: { $set: action.open } } })
    case SET_ALERT:
      return update(state, { dialog: { alert: { $set: action.alert } } })
    default:
      return state
  }
}

export default yquiApp

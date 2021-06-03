import update from 'immutability-helper'
import {
  RESET, RECV_SELF_ID, RECV_ROOMS, TOGGLE_SHOW_LEFT, RECV_ROOM, RECV_RULE,
  RECV_SG, RECV_BUTTONS, RECV_TIMER, RECV_CHAT, SET_TEAMS
} from './actions'
import { initUsers, initUser, usersFromJson, findMaster } from '../lib/user'
import { initSg, mergeSgWithJson } from '../lib/score'
import { initButtons, buttonsFromJson } from '../lib/buttons'
import { initRule } from '../lib/rule'
import {
  playersOfTeams, teamsFromJson, recvTeamsUpdator, setTeamsUpdator
} from '../lib/team'
import { initialState as browserState, browserReducer } from './browser_reducer'
import { initialState as dialogState, dialogReducer } from './dialog_reducer'
import { initialState as openState, openReducer } from './open_reducer'
import { initialState as boardState, boardReducer } from './board_reducer'

const initialState = {
  browser: browserState,
  dialog: dialogState,
  open: openState,
  board: boardState,
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
  sg: initSg,
  buttons: initButtons,
  rule: initRule,
  timer: {
    running: false,
    remaining: 0
  },
  chats: [],
  editTeams: null,
  dispTeams: []
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
  state = update(state, { browser: { $set: browserReducer(state.browser, action) } })
  state = update(state, { dialog: { $set: dialogReducer(state.dialog, action) } })
  state = update(state, { open: { $set: openReducer(state.open, action) } })
  state = update(state, { board: { $set: boardReducer(state.board, action) } })

  switch (action.type) {
    case RESET:
      return update(initialState, {
        browser: { $set: state.browser },
        selfID: { $set: state.selfID },
        rooms: { $set: state.rooms }
      })
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
    default:
      return state
  }
}

export default yquiApp

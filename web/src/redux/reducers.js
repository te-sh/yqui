import update from 'immutability-helper'
import { RESET, RECV_SELF_ID, RECV_ROOM, SET_TEAMS } from './actions'
import { initUsers, initUser, usersFromJson, findMaster } from '../lib/user'
import {
  playersOfTeams, teamsFromJson, recvTeamsUpdator, setTeamsUpdator
} from '../lib/team'
import { initialState as browserState, browserReducer } from './browser_reducer'
import { initialState as dialogState, dialogReducer } from './dialog_reducer'
import { initialState as openState, openReducer } from './open_reducer'
import { initialState as roomsState, roomsReducer } from './rooms_reducer'
import { initialState as appearState, appearReducer } from './appear_reducer'
import { initialState as chatState, chatReducer } from './chat_reducer'
import { initialState as ruleState, ruleReducer } from './rule_reducer'
import { initialState as buttonsState, buttonsReducer } from './buttons_reducer'
import { initialState as scoreState, scoreReducer } from './score_reducer'
import { initialState as boardState, boardReducer } from './board_reducer'
import { initialState as timerState, timerReducer } from './timer_reducer'

const initialState = {
  browser: browserState,
  dialog: dialogState,
  open: openState,
  rooms: roomsState,
  appear: appearState,
  chat: chatState,
  rule: ruleState,
  buttons: buttonsState,
  score: scoreState,
  board: boardState,
  timer: timerState,
  selfID: null,
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
    ...recvTeamsUpdator(state, users, teams)
  })
}

const yquiApp = (state = initialState, action) => {
  state = update(state, { browser: { $set: browserReducer(state.browser, action) } })
  state = update(state, { dialog: { $set: dialogReducer(state.dialog, action) } })
  state = update(state, { open: { $set: openReducer(state.open, action) } })
  state = update(state, { rooms: { $set: roomsReducer(state.rooms, action) } })
  state = update(state, { appear: { $set: appearReducer(state.appear, action) } })
  state = update(state, { chat: { $set: chatReducer(state.chat, action) } })
  state = update(state, { rule: { $set: ruleReducer(state.rule, action) } })
  state = update(state, { buttons: { $set: buttonsReducer(state.buttons, action) } })
  state = update(state, { score: { $set: scoreReducer(state.score, action) } })
  state = update(state, { board: { $set: boardReducer(state.board, action) } })
  state = update(state, { timer: { $set: timerReducer(state.timer, action) } })

  switch (action.type) {
    case RESET:
      return update(initialState, {
        browser: { $set: state.browser },
        selfID: { $set: state.selfID },
        rooms: { $set: state.rooms }
      })
    case RECV_SELF_ID:
      return update(state, { selfID: { $set: action.selfID } })
    case RECV_ROOM:
      return recvRoom(action, state)
    case SET_TEAMS:
      return update(state, setTeamsUpdator(action.payload))
    default:
      return state
  }
}

export default yquiApp

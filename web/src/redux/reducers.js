import update from 'immutability-helper'
import {
  RESET, RECV_SELF_ID, RECV_ROOM, SET_TEAMS, UPDATE_DISP_TEAMS
} from './actions'
import { initUsers, initUser, usersFromJson } from '../lib/user'
import { teamsFromJson, recvTeamsUpdator } from '../lib/team'
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
  teams: [],
  editTeams: null,
  dispTeams: [],
  summary: {
    masterName: '',
    numPlayers: 0,
    playerNames: [],
    numObservers: 0,
    observerNames: []
  }
}

const recvRoom = (state, { room }) => {
  const users = usersFromJson(room.users)
  const teams = teamsFromJson(room.teams)
  return update(state, {
    roomNo: { $set: room.no },
    tag: { $set: room.tag },
    users: { $set: users },
    user: { $set: users.get(state.selfID) },
    teams: { $set: teams },
    ...recvTeamsUpdator(state, users, teams),
    summary: { $set: room.summary }
  })
}

const setTeams = (state, { payload: { editTeams, dispTeams } }) => {
  return update(state, {
    editTeams: { $set: editTeams !== undefined ? editTeams : state.editTeams },
    dispTeams: { $set: dispTeams !== undefined ? dispTeams : state.dispTeams }
  })
}

const yquiApp = (state = initialState, action) => {
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
      return recvRoom(state, action)
    case SET_TEAMS:
      return setTeams(state, action)
    case UPDATE_DISP_TEAMS:
      return update(state, {
        dispTeams: { $set: Array.from(state.dispTeams) }
      })
    default:
      return update(state, {
        browser: { $set: browserReducer(state.browser, action) },
        dialog: { $set: dialogReducer(state.dialog, action) },
        open: { $set: openReducer(state.open, action) },
        rooms: { $set: roomsReducer(state.rooms, action) },
        appear: { $set: appearReducer(state.appear, action) },
        chat: { $set: chatReducer(state.chat, action) },
        rule: { $set: ruleReducer(state.rule, action) },
        buttons: { $set: buttonsReducer(state.buttons, action) },
        score: { $set: scoreReducer(state.score, action) },
        board: { $set: boardReducer(state.board, action) },
        timer: { $set: timerReducer(state.timer, action) }
      })
  }
}

export default yquiApp

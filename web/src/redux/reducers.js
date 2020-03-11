import update from 'immutability-helper'
import {
  RESET, SET_WEB_SOCKET,
  RECV_SELF_ID, RECV_ROOM, RECV_ATTENDEES, RECV_SCORES,
  RECV_BUTTONS, RECV_RULE, RECV_CHAT, SET_EDIT_TEAM
} from './actions'
import { isMaster, isPlayer, ruleText } from '../util'

const initialState = {
  ws: null,
  selfID: null,
  users: {},
  userIDs: [],
  attendees: {
    master: -1,
    teamGame: false,
    players: []
  },
  isMaster: false,
  isPlayer: true,
  scores: {},
  buttons: {
    pushers: [],
    pusherTimes: [],
    answerers: [],
    right: -1
  },
  rule: {
    rightNum: 1,
    pointCorrect: 1,
    pointWrong: 0,
    batsuWrong: 1,
    lockWrong: 0,
    winPoint: { active: true, value: 7 },
    losePoint: { active: false, value: 0 },
    loseBatsu: { active: true, value: 3 },
    showPoint: true
  },
  ruleText: {},
  editTeam: null,
  chats: []
}

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
  case RESET:
    return initialState
  case SET_WEB_SOCKET:
    return update(state, {
      ws: { $set: action.ws }
    })
  case RECV_SELF_ID:
    return update(state, {
      selfID: { $set: action.selfID },
      isMaster: { $set: isMaster(action.selfID, state.attendees) },
      isPlayer: { $set: isPlayer(action.selfID, state.attendees) }
    })
  case RECV_ROOM:
    action.room.buttons.pushers = action.room.buttons.pushers || []
    action.room.buttons.pushTimes = action.room.buttons.pushTimes || []
    action.room.buttons.answerers = action.room.buttons.answerers || []
    return update(state, {
      users: { $set: action.room.users },
      userIDs: { $set: Object.keys(action.room.users).map(key => parseInt(key)) },
      attendees: { $set: action.room.attendees },
      scores: { $set: action.room.scores },
      buttons: { $set: action.room.buttons },
      isMaster: { $set: isMaster(state.selfID, action.room.attendees) },
      isPlayer: { $set: isPlayer(state.selfID, action.room.attendees) },
      ruleText: { $set: ruleText(state.rule, action.room.attendees) }
    })
  case RECV_ATTENDEES:
    action.attendees.players = action.attendees.players || []
    action.attendees.observers = action.attendees.observers || []
    return update(state, {
      attendees: { $set: action.attendees },
      isMaster: { $set: isMaster(state.selfID, action.attendees) },
      isPlayer: { $set: isPlayer(state.selfID, action.attendees) },
      ruleText: { $set: ruleText(state.rule, action.attendees) }
    })
  case RECV_SCORES:
    return update(state, {
      scores: { $set: action.scores }
    })
  case RECV_BUTTONS:
    action.buttons.pushers = action.buttons.pushers || []
    action.buttons.pushTimes = action.buttons.pushTimes || []
    action.buttons.answerers = action.buttons.answerers || []
    return update(state, {
      buttons: { $set: action.buttons }
    })
  case RECV_RULE:
    return update(state, {
      rule: { $set: action.rule },
      ruleText: { $set: ruleText(action.rule, state.attendees) }
    })
  case RECV_CHAT:
    return update(state, {
      chats: { $push: [action.chat] }
    })
  case SET_EDIT_TEAM:
    return update(state, {
      editTeam: { $set: action.editTeam }
    })
  default:
    return state
  }
}

export default yquiApp

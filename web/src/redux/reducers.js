import update from 'immutability-helper'
import {
  RESET, SET_WEB_SOCKET,
  RECV_SELF_ID, RECV_USERS, RECV_ATTENDEES, RECV_SCORES,
  RECV_BUTTONS, RECV_RULE, RECV_MESSAGE
} from './actions'
import ruleText from './ruleText'

const initialState = {
  ws: null,
  selfID: null,
  users: {},
  attendees: {
    master: -1,
    players: [],
    observers: []
  },
  isMaster: false,
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
  messages: []
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
      isMaster: { $set: action.selfID === state.attendees.master }
    })
  case RECV_USERS:
    return update(state, {
      users: { $set: action.users }
    })
  case RECV_ATTENDEES:
    action.attendees.players = action.attendees.players || []
    action.attendees.observers = action.attendees.observers || []
    return update(state, {
      attendees: { $set: action.attendees },
      isMaster: { $set: state.selfID === action.attendees.master },
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
  case RECV_MESSAGE:
    return update(state, {
      messages: { $push: [action.message] }
    })
  default:
    return state
  }
}

export default yquiApp

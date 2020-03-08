import {
  RESET, SET_WEB_SOCKET,
  RECV_SELF_ID, RECV_USERS, RECV_ATTENDEES, RECV_SCORES,
  RECV_BUTTONS, RECV_RULE, RECV_MESSAGE
} from './actions'

const initialState = {
  ws: null,
  selfID: null,
  users: {},
  attendees: {
    players: [],
    master: -1,
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
  messages: []
}

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
  case RESET:
    return initialState
  case SET_WEB_SOCKET:
    return Object.assign({}, state, {
      ws: action.ws
    })
  case RECV_SELF_ID:
    return Object.assign({}, state, {
      selfID: action.selfID,
      isMaster: action.selfID === state.attendees.master
    })
  case RECV_USERS:
    return Object.assign({}, state, {
      users: action.users
    })
  case RECV_ATTENDEES:
    action.attendees.players = action.attendees.players || []
    action.attendees.observers = action.attendees.observers || []
    return Object.assign({}, state, {
      attendees: action.attendees,
      isMaster: state.selfID === action.attendees.master
    })
  case RECV_SCORES:
    return Object.assign({}, state, {
      scores: action.scores
    })
  case RECV_BUTTONS:
    action.buttons.pushers = action.buttons.pushers || []
    action.buttons.pushTimes = action.buttons.pushTimes || []
    action.buttons.answerers = action.buttons.answerers || []
    return Object.assign({}, state, {
      buttons: action.buttons
    })
  case RECV_RULE:
    return Object.assign({}, state, {
      rule: action.rule
    })
  case RECV_MESSAGE:
    return Object.assign({}, state, {
      messages: state.messages.concat(action.message)
    })
  default:
    return state
  }
}

export default yquiApp

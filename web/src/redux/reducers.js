import URI from 'urijs'
import {
  ENTER_ROOM_OPEN, ENTER_ROOM, LEAVE_ROOM,
  SETTING_OPEN, SETTING_CLOSE, RULE_OPEN, RULE_CLOSE,
  RECV_SELF_ID, RECV_ATTENDEES, RECV_SCORES, RECV_BUTTONS,
  RECV_RULE, RECV_MESSAGE
} from './actions'

const initialState = {
  enterRoomOpen: true,
  ruleOpen: false,
  settingOpen: false,
  ws: null,
  selfID: null,
  attendees: {
    users: {},
    players: [],
    master: -1
  },
  scores: {},
  buttons: {
    pushers: [],
    pusherTimes: [],
    right: -1
  },
  rule: {},
  messages: []
}

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
  case ENTER_ROOM_OPEN:
    return Object.assign({}, state, {
      enterRoomOpen: true
    })
  case ENTER_ROOM:
    return Object.assign({}, state, {
      enterRoomOpen: false,
      ws: new WebSocket(uri.query({ name: action.name }).toString())
    })
  case LEAVE_ROOM:
    return initialState
  case SETTING_OPEN:
    return Object.assign({}, state, {
      settingOpen: true
    })
  case SETTING_CLOSE:
    return Object.assign({}, state, {
      settingOpen: false
    })
  case RULE_OPEN:
    return Object.assign({}, state, {
      ruleOpen: true
    })
  case RULE_CLOSE:
    return Object.assign({}, state, {
      ruleOpen: false
    })
  case RECV_SELF_ID:
    return Object.assign({}, state, {
      selfID: action.selfID
    })
  case RECV_ATTENDEES:
    return Object.assign({}, state, {
      attendees: action.attendees
    })
  case RECV_SCORES:
    return Object.assign({}, state, {
      scores: action.scores
    })
  case RECV_BUTTONS:
    return Object.assign({}, state, {
      buttons: action.buttons
    })
  case RECV_RULE:
    return Object.assign({}, state, {
      rule: action.rule
    })
  case RECV_MESSAGE:
    return Object.assign({}, state, {
      messages: [action.message].concat(state.messages)
    })
  default:
    return state
  }
}

export default yquiApp

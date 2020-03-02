import URI from 'urijs'
import {
  ENTER_ROOM_OPEN, ENTER_ROOM, LEAVE_ROOM,
  SETTING_OPEN, SETTING_CLOSE, RULE_OPEN, RULE_CLOSE,
  RECV_RULE, RECV_ANSWERS, RECV_ANSWER_TIMES, RECV_RIGHT,
  RECV_SELF_ID, RECV_ROOM, RECV_MESSAGE
} from './actions'

const initialState = {
  enterRoomOpen: true,
  ruleOpen: false,
  settingOpen: false,
  ws: null,
  selfID: null,
  room: {
    users: {},
    players: [],
    master: -1,
  },
  answers: [],
  answerTimes: [],
  right: -1,
  rule: {
    rightNum: 1,
    correctByCorrect: 1,
    wrongByWrong: 1,
    winCorrect: 7,
    loseWrong: 3
  },
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
  case RECV_RULE:
    return Object.assign({}, state, {
      rule: action.rule
    })
  case RECV_ANSWERS:
    return Object.assign({}, state, {
      answers: action.answers
    })
  case RECV_ANSWER_TIMES:
    return Object.assign({}, state, {
      answerTimes: action.answerTimes
    })
  case RECV_RIGHT:
    return Object.assign({}, state, {
      right: action.right
    })
  case RECV_SELF_ID:
    return Object.assign({}, state, {
      selfID: action.selfID
    })
  case RECV_ROOM:
    return Object.assign({}, state, {
      room: action.room
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

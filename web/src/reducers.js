import URI from 'urijs'
import {
  ENTER_ROOM_OPEN, ENTER_ROOM, LEAVE_ROOM,
  RECV_ROOM, RECV_MESSAGE, RECV_ANSWERS
} from './actions'

const initialState = {
  enterRoom: true,
  ws: null,
  room: {
    users: {},
    players: [],
    master: -1,
  },
  answers: [],
  messages: []
}

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
  case ENTER_ROOM_OPEN:
    return Object.assign({}, state, {
      enterRoom: true
    })
  case ENTER_ROOM:
    return Object.assign({}, state, {
      enterRoom: false,
      ws: new WebSocket(uri.query({ name: action.name }).toString())
    })
  case LEAVE_ROOM:
    return initialState
  case RECV_ROOM:
    return Object.assign({}, state, {
      room: action.room
    })
  case RECV_MESSAGE:
    return Object.assign({}, state, {
      messages: [action.message].concat(state.messages)
    })
  case RECV_ANSWERS:
    return Object.assign({}, state, {
      answers: action.answers
    })
  default:
    return state
  }
}

export default yquiApp

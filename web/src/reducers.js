import URI from 'urijs'
import { ENTER_ROOM_OPEN, ENTER_ROOM, LEAVE_ROOM } from './actions'

const initialState = {
  enterRoom: true,
  ws: null,
  room: {
    ids: [],
    users: {}
  }
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
  default:
    return state
  }
}

export default yquiApp

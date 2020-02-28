import URI from 'urijs'
import { ENTER_ROOM, ENTER_ROOM_OPEN } from './actions'

const initialState = {
  enterRoom: true,
  ws: null,
  room: {
    ids: [],
    users: {}
  }
}

const yquiApp = (state = initialState, action) => {
  switch (action.type) {
  case ENTER_ROOM:
    return Object.assign({}, state, {
      enterRoom: false,
      ws: createWebSocket(action.name)
    })
  case ENTER_ROOM_OPEN:
    return Object.assign({}, state, {
      enterRoom: true
    })
  default:
    return state
  }
}

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const createWebSocket = name => {
  var ws = new WebSocket(uri.query({ name }).toString())

  ws.onopen = evt => {
    console.log('ws open')
  }

  ws.onclose = evt => {
    console.log('ws close')
  }

  ws.onmessage = evt => {
    console.log('ws received: ' + evt.data)
  }

  ws.onerror = evt => {
    console.log('ws error: ' + evt.data)
  }
}

export default yquiApp

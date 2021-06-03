export const RESET = 'RESET'
export const RECV_ROOMS = 'RECV_ROOMS'
export const TOGGLE_SHOW_LEFT = 'TOGGLE_SHOW_LEFT'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_ROOM = 'RECV_ROOM'
export const RECV_RULE = 'RECV_RULE'
export const RECV_BUTTONS = 'RECV_BUTTONS'
export const RECV_TIMER = 'RECV_TIMER'
export const SET_TEAMS = 'SET_EDIT_TEAMS'

export const reset = () => {
  return { type: RESET }
}

export const recvSelfID = selfID => {
  return { type: RECV_SELF_ID, selfID }
}

export const recvRooms = rooms => {
  return { type: RECV_ROOMS, rooms }
}

export const toggleShowLeft = () => {
  return { type: TOGGLE_SHOW_LEFT }
}

export const recvRoom = room => {
  return { type: RECV_ROOM, room }
}

export const recvRule = rule => {
  return { type: RECV_RULE, rule }
}

export const recvButtons = buttons => {
  return { type: RECV_BUTTONS, buttons }
}

export const recvTimer = timer => {
  return { type: RECV_TIMER, timer }
}

export const setTeams = payload => {
  return { type: SET_TEAMS, payload }
}

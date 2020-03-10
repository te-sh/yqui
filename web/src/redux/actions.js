export const RESET = 'RESET'
export const SET_WEB_SOCKET = 'SET_WEB_SOCKET'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_USERS = 'RECV_USERS'
export const RECV_ATTENDEES = 'RECV_ATTENDEES'
export const RECV_SCORES = 'RECV_SCORES'
export const RECV_BUTTONS = 'RECV_BUTTONS'
export const RECV_RULE = 'RECV_RULE'
export const RECV_CHAT = 'RECV_CHAT'
export const SET_EDIT_TEAM = 'SET_EDIT_TEAM'

export const reset = () => {
  return { type: RESET }
}

export const setWebSocket = ws => {
  return { type: SET_WEB_SOCKET, ws }
}

export const recvSelfID = selfID => {
  return { type: RECV_SELF_ID, selfID }
}

export const recvUsers = users => {
  return { type: RECV_USERS, users }
}

export const recvAttendees = attendees => {
  return { type: RECV_ATTENDEES, attendees }
}

export const recvScores = scores => {
  return { type: RECV_SCORES, scores }
}

export const recvButtons = buttons => {
  return { type: RECV_BUTTONS, buttons }
}

export const recvRule = rule => {
  return { type: RECV_RULE, rule }
}

export const recvChat = chat => {
  return { type: RECV_CHAT, chat }
}

export const setEditTeam = attendees => {
  return { type: SET_EDIT_TEAM, attendees }
}

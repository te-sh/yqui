export const ENTER_ROOM_OPEN = 'ENTER_ROOM_OPEN'
export const ENTER_ROOM = 'ENTER_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_USERS = 'RECV_USERS'
export const RECV_ATTENDEES = 'RECV_ATTENDEES'
export const RECV_SCORES = 'RECV_SCORES'
export const RECV_BUTTONS = 'RECV_BUTTONS'
export const RECV_RULE = 'RECV_RULE'
export const RECV_MESSAGE = 'RECV_MESSAGE'

export const enterRoomOpen = () => {
  return { type: ENTER_ROOM_OPEN }
}

export const enterRoom = name => {
  return { type: ENTER_ROOM, name }
}

export const leaveRoom = () => {
  return { type: LEAVE_ROOM }
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

export const recvMessage = message => {
  return { type: RECV_MESSAGE, message }
}

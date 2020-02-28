export const ENTER_ROOM_OPEN = 'ENTER_ROOM_OPEN'
export const ENTER_ROOM = 'ENTER_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const RECV_ROOM = 'RECV_ROOM'
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

export const recvRoom = (room) => {
  return { type: RECV_ROOM, room }
}

export const recvMessage = (message) => {
  return { type: RECV_MESSAGE, message }
}

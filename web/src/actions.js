export const ENTER_ROOM = 'ENTER_ROOM'
export const ENTER_ROOM_OPEN = 'ENTER_ROOM_OPEN'

export const enterRoom = name => {
  return { type: ENTER_ROOM, name }
}

export const enterRoomOpen = () => {
  return { type: ENTER_ROOM_OPEN }
}

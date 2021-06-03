export const RECV_ROOMS = 'RECV_ROOMS'

export const recvRooms = rooms => {
  return { type: RECV_ROOMS, rooms }
}

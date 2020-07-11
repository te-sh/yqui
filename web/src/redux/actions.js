export const RESET = 'RESET'
export const SET_WEB_SOCKET = 'SET_WEB_SOCKET'
export const RECV_ROOMS = 'RECV_ROOMS'
export const RECV_JOINED = 'RECV_JOINED'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_ROOM = 'RECV_ROOM'
export const RECV_USERS = 'RECV_USERS'
export const RECV_BOARDS = 'RECV_BOARDS'
export const RECV_BOARD_LOCK = 'RECV_BOARD_LOCK'
export const RECV_BOARD = 'RECV_BOARD'
export const RECV_SG = 'RECV_SG'
export const RECV_BUTTONS = 'RECV_BUTTONS'
export const RECV_RULE = 'RECV_RULE'
export const RECV_CHAT = 'RECV_CHAT'
export const SET_EDIT_TEAMS = 'SET_EDIT_TEAMS'

export const reset = () => {
  return { type: RESET }
}

export const setWebSocket = ws => {
  return { type: SET_WEB_SOCKET, ws }
}

export const recvRooms = rooms => {
  return { type: RECV_ROOMS, rooms }
}

export const recvJoined = roomNo => {
  return { type: RECV_JOINED, roomNo }
}

export const recvSelfID = selfID => {
  return { type: RECV_SELF_ID, selfID }
}

export const recvRoom = room => {
  return { type: RECV_ROOM, room }
}

export const recvUsers = users => {
  return { type: RECV_USERS, users }
}

export const recvBoards = boards => {
  return { type: RECV_BOARDS, boards }
}

export const recvBoard = board => {
  return { type: RECV_BOARD, board }
}

export const recvBoardLock = boardLock => {
  return { type: RECV_BOARD_LOCK, boardLock }
}

export const recvSg = sg => {
  return { type: RECV_SG, sg }
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

export const setEditTeams = editTeams => {
  return { type: SET_EDIT_TEAMS, editTeams }
}

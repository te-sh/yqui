export const SET_MOBILE = 'SET_MOBILE'
export const RESET = 'RESET'
export const SET_WEB_SOCKET = 'SET_WEB_SOCKET'
export const RECV_ROOMS = 'RECV_ROOMS'
export const TOGGLE_SHOW_LEFT = 'TOGGLE_SHOW_LEFT'
export const RECV_JOINED = 'RECV_JOINED'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_ROOM = 'RECV_ROOM'
export const RECV_RULE = 'RECV_RULE'
export const RECV_BG = 'RECV_BG'
export const RECV_BOARD = 'RECV_BOARD'
export const RECV_SG = 'RECV_SG'
export const RECV_BUTTONS = 'RECV_BUTTONS'
export const RECV_TIMER = 'RECV_TIMER'
export const RECV_CHAT = 'RECV_CHAT'
export const SET_TEAMS = 'SET_EDIT_TEAMS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_EDIT_BOARD = 'ADD_EDIT_BOARD'
export const REMOVE_EDIT_BOARD = 'REMOVE_EDIT_BOARD'
export const CLEAR_EDIT_BOARDS = 'CLEAR_EDIT_BOARDS'
export const SET_OPEN_RULE = 'SET_OPEN_RULE'
export const SET_OPEN_SETTING = 'SET_OPEN_SETTING'
export const SET_OPEN_HELP = 'SET_OPEN_HELP'
export const SET_OPEN_LEAVE = 'SET_OPEN_LEAVE'

export const setMobile = mobile => {
  return { type: SET_MOBILE, mobile }
}

export const reset = () => {
  return { type: RESET }
}

export const setWebSocket = ws => {
  return { type: SET_WEB_SOCKET, ws }
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

export const recvJoined = roomNo => {
  return { type: RECV_JOINED, roomNo }
}

export const recvRoom = room => {
  return { type: RECV_ROOM, room }
}

export const recvRule = rule => {
  return { type: RECV_RULE, rule }
}

export const recvBg = bg => {
  return { type: RECV_BG, bg }
}

export const recvBoard = board => {
  return { type: RECV_BOARD, board }
}

export const recvSg = sg => {
  return { type: RECV_SG, sg }
}

export const recvButtons = buttons => {
  return { type: RECV_BUTTONS, buttons }
}

export const recvTimer = timer => {
  return { type: RECV_TIMER, timer }
}

export const recvChat = chat => {
  return { type: RECV_CHAT, chat }
}

export const setTeams = payload => {
  return { type: SET_TEAMS, payload }
}

export const setBoard = board => {
  return { type: SET_BOARD, board }
}

export const addEditBoard = board => {
  return { type: ADD_EDIT_BOARD, board }
}

export const removeEditBoard = board => {
  return { type: REMOVE_EDIT_BOARD, board }
}

export const clearEditBoards = () => {
  return { type: CLEAR_EDIT_BOARDS }
}

export const setOpenRule = open => {
  return { type: SET_OPEN_RULE, open }
}

export const setOpenSetting = open => {
  return { type: SET_OPEN_SETTING, open }
}

export const setOpenHelp = open => {
  return { type: SET_OPEN_HELP, open }
}

export const setOpenLeave = open => {
  return { type: SET_OPEN_LEAVE, open }
}

export const RECV_BG = 'RECV_BG'
export const RECV_BOARD = 'RECV_BOARD'
export const SET_BOARD = 'SET_BOARD'
export const ADD_EDIT_BOARD = 'ADD_EDIT_BOARD'
export const REMOVE_EDIT_BOARD = 'REMOVE_EDIT_BOARD'
export const CLEAR_EDIT_BOARDS = 'CLEAR_EDIT_BOARDS'

export const recvBg = bg => {
  return { type: RECV_BG, bg }
}

export const recvBoard = board => {
  return { type: RECV_BOARD, board }
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

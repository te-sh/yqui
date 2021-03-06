import update from 'immutability-helper'
import { toIntMap } from '../lib/util'
import {
  RECV_BG, RECV_BOARD, SET_BOARD, ADD_EDIT_BOARD, REMOVE_EDIT_BOARD, CLEAR_EDIT_BOARDS
} from './board_actions'

export const initialState = {
  bg: {
    boards: new Map(),
    lock: false
  },
  edit: new Set()
}

export const initialBoard = {
  id: -1,
  text: '',
  correct: 'none',
  open: false
}

const recvBg = ({ bg, edit }, action) => {
  if (action === undefined) {
    return bg
  }

  const boards = toIntMap(action.boards)
  return {
    boards: new Map([...boards.keys()].map(id => {
      if (bg.boards.has(id) && edit.has(id) &&
          bg.boards.get(id).text === boards.get(id).text) {
        return [id, bg.boards.get(id)]
      } else {
        return [id, boards.get(id)]
      }
    })),
    lock: action.lock
  }
}

export const boardReducer = (state, action) => {
  switch (action.type) {
    case RECV_BG:
      return update(state, { bg: { $set: recvBg(state, action.bg) } })
    case RECV_BOARD:
      return update(state, { bg: { boards: { $add: [[action.board.id, action.board]] } } })
    case SET_BOARD:
      return update(state, { bg: { boards: { $add: [[action.board.id, action.board]] } } })
    case ADD_EDIT_BOARD:
      return update(state, { edit: { $add: [action.board.id] } })
    case REMOVE_EDIT_BOARD:
      return update(state, { edit: { $remove: [action.board.id] } })
    case CLEAR_EDIT_BOARDS:
      return update(state, { edit: { $set: new Set() } })
    default:
      return state
  }
}

export default boardReducer

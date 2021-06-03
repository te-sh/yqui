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

const mergeBgWithJson = ({ bg, edit }, json) => {
  if (json === undefined) {
    return bg
  }

  const newBoards = toIntMap(json.boards)
  return {
    boards: new Map([...newBoards.keys()].map(id => {
      if (bg.boards.has(id) && edit.has(id) &&
          bg.boards.get(id).text === newBoards.get(id).text) {
        return [id, bg.boards.get(id)]
      } else {
        return [id, newBoards.get(id)]
      }
    })),
    lock: json.lock
  }
}

export const boardReducer = (state, action) => {
  switch (action.type) {
    case RECV_BG:
      return update(state, { bg: { $set: mergeBgWithJson(state, action.bg) } })
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

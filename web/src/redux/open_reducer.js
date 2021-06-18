import update from 'immutability-helper'
import {
  SET_OPEN_TAG, SET_OPEN_RULE, SET_OPEN_SETTING,
  SET_OPEN_HELP, SET_OPEN_CLEAR
} from './open_actions'

export const initialState = {
  tag: false,
  rule: false,
  setting: false,
  help: false,
  clear: false
}

export const openReducer = (state, action) => {
  switch (action.type) {
    case SET_OPEN_TAG:
      return update(state, { tag: { $set: action.open } })
    case SET_OPEN_RULE:
      return update(state, { rule: { $set: action.open } })
    case SET_OPEN_SETTING:
      return update(state, { setting: { $set: action.open } })
    case SET_OPEN_HELP:
      return update(state, { help: { $set: action.open } })
    case SET_OPEN_CLEAR:
      return update(state, { clear: { $set: action.open } })
    default:
      return state
  }
}

import update from 'immutability-helper'
import { SET_ALERT, SET_CONFIRM, SET_PROMPT } from './dialog_actions'

export const initialState = {
  alert: null,
  confirm: null,
  prompt: null
}

export const dialogReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return update(state, { alert: { $set: action.alert } })
    case SET_CONFIRM:
      return update(state, { confirm: { $set: action.confirm } })
    case SET_PROMPT:
      return update(state, { prompt: { $set: action.prompt } })
    default:
      return state
  }
}

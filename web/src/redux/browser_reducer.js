import update from 'immutability-helper'
import { SET_MOBILE, SET_WEB_SOCKET } from './browser_actions'

export const initialState = {
  mobile: false,
  ws: null
}

export const browserReducer = (state, action) => {
  switch (action.type) {
    case SET_MOBILE:
      return update(state, { mobile: { $set: action.mobile } })
    case SET_WEB_SOCKET:
      return update(state, { ws: { $set: action.ws } })
    default:
      return state
  }
}

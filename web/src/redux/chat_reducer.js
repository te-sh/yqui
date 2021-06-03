import update from 'immutability-helper'
import { RECV_CHAT } from './chat_actions'

export const initialState = {
  messages: []
}

export const chatReducer = (state, action) => {
  switch (action.type) {
    case RECV_CHAT:
      return update(state, { messages: { $push: [action.chat] } })
    default:
      return state
  }
}

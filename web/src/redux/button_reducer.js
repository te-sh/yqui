import { toIntMap } from '../lib/util'
import { RECV_BUTTON } from './button_actions'

export const initialState = {
  user: new Map(),
  continueingChance: false
}

export const initialButtonUser = {
  order: -1,
  delay: -1,
  myTurn: false
}

const recvButton = (state, { button }) => {
  return {
    user: toIntMap(button.user),
    continueingChance: button.continueingChance
  }
}

export const buttonReducer = (state, action) => {
  switch (action.type) {
    case RECV_BUTTON:
      return recvButton(state, action)
    default:
      return state
  }
}

import update from 'immutability-helper'
import { TOGGLE_SHOW_LEFT } from './appear_actions'

export const initialState = {
  showLeft: true
}

export const appearReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_LEFT:
      return update(state, { showLeft: { $set: !state.showLeft } })
    default:
      return state
  }
}

import { normalizeArray } from '../lib/util'
import { RECV_BUTTONS } from './buttons_actions'

export const initialState = {
  pushers: [],
  pusherTimes: [],
  answerers: []
}

const buttonsFromJson = json => {
  return {
    pushers: normalizeArray(json.pushers),
    pushTimes: normalizeArray(json.pushTimes),
    answerers: normalizeArray(json.answerers)
  }
}

export const buttonsReducer = (state, action) => {
  switch (action.type) {
    case RECV_BUTTONS:
      return buttonsFromJson(action.buttons)
    default:
      return state
  }
}

import { RECV_TIMER } from './timer_actions'

export const initialState = {
  running: false,
  remaining: 0
}

export const timerReducer = (state, action) => {
  switch (action.type) {
    case RECV_TIMER:
      return action.timer
    default:
      return state
  }
}

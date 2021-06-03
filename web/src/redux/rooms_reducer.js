import { RECV_ROOMS } from './rooms_actions'

export const initialState = []

export const roomsReducer = (state, action) => {
  switch (action.type) {
    case RECV_ROOMS:
      return action.rooms
    default:
      return state
  }
}

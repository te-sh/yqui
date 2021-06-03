import { initRule } from '../lib/rule'
import { RECV_RULE } from './rule_actions'

export const initialState = initRule

export const ruleReducer = (state, action) => {
  switch (action.type) {
    case RECV_RULE:
      return action.rule
    default:
      return state
  }
}

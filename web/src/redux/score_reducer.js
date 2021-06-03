import update from 'immutability-helper'
import { toIntMap } from '../lib/util'
import { RECV_SG } from './score_actions'

export const initialState = {
  sg: {
    player: {
      scores: new Map()
    },
    team: {
      scores: new Map()
    }
  }
}

export const initialScore = {
  point: 0,
  batsu: 0,
  lock: 0,
  consCorrect: 0,
  passSeat: false,
  win: 0,
  lose: 0
}

const mergeSgWithJson = ({ sg }, json) => {
  return {
    player: { scores: json.player ? toIntMap(json.player.scores) : sg.player },
    team: { scores: json.team ? toIntMap(json.team.scores) : sg.team }
  }
}

export const scoreReducer = (state, action) => {
  switch (action.type) {
    case RECV_SG:
      return update(state, { sg: { $set: mergeSgWithJson(state, action.sg) } })
    default:
      return state
  }
}

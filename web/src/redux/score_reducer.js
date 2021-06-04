import update from 'immutability-helper'
import { toIntMap } from '../lib/util'
import { RECV_SG, SET_EDIT_SCORES, UNSET_EDIT_SCORES, SET_EDIT_SCORE } from './score_actions'

export const initialState = {
  sg: {
    player: {
      scores: new Map()
    },
    team: {
      scores: new Map()
    }
  },
  edit: null
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

const recvSg = (state, { sg }) => {
  const player = sg.player ? toIntMap(sg.player.scores) : state.sg.player
  const team = sg.team ? toIntMap(sg.team.scores) : state.sg.team
  state = update(state, {
    sg: {
      $set: {
        player: { scores: player },
        team: { scores: team }
      }
    }
  })

  if (state.edit) {
    const edit = new Map([...player.keys()].map(id => (
      [id, state.edit.scores.has(id) ? state.edit.scores.get(id) : player.get(id)]
    )))
    state = update(state, { edit: { $set: { scores: edit } } })
  }

  return state
}

export const scoreReducer = (state, action) => {
  switch (action.type) {
    case RECV_SG:
      return recvSg(state, action)
    case SET_EDIT_SCORES:
      return update(state, { edit: { $set: { scores: state.sg.player.scores } } })
    case UNSET_EDIT_SCORES:
      return update(state, { edit: { $set: null } })
    case SET_EDIT_SCORE:
      return update(state, { edit: { scores: { $add: [[action.id, action.score]] } } })
    default:
      return state
  }
}

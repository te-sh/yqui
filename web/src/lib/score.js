import update from 'immutability-helper'
import { toIntMap } from './util'

export const initSg = {
  player: {
    scores: new Map()
  },
  team: {
    scores: new Map()
  }
}

export const sgFromJson = json => {
  return update(json, {
    player: { scores: { $apply: toIntMap } },
    team: { scores: { $apply: toIntMap } }
  })
}

import { toIntMap } from './util'
import { storeScoreBackup, retrieveScoreBackup } from './dexie'
import store from '../redux/store'

export const initSg = {
  player: {
    scores: new Map()
  },
  team: {
    scores: new Map()
  }
}

export const initScore = {
  point: 0,
  batsu: 0,
  lock: 0,
  consCorrect: 0,
  passSeat: false,
  win: 0,
  lose: 0
}

export const mergeSgWithJson = ({ sg }, json) => {
  return {
    player: { scores: json.player ? toIntMap(json.player.scores) : sg.player },
    team: { scores: json.team ? toIntMap(json.team.scores) : sg.team }
  }
}

export const saveScoreBackup = async encoded => {
  const { selfID, users } = store.getState()
  storeScoreBackup(users.get(selfID).name, encoded)
}

export const restoreScoreBackup = async name => {
  return retrieveScoreBackup(name)
}

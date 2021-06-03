import { storeScoreBackup, retrieveScoreBackup } from './dexie'
import store from '../redux/store'

export const initScore = {
  point: 0,
  batsu: 0,
  lock: 0,
  consCorrect: 0,
  passSeat: false,
  win: 0,
  lose: 0
}

export const saveScoreBackup = async encoded => {
  const { user } = store.getState()
  storeScoreBackup(user.name, encoded)
}

export const restoreScoreBackup = async name => {
  return retrieveScoreBackup(name)
}

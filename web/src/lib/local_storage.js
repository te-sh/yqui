const SCORE_BACKUP_KEY = 'scoreBackup'
const VOLUME_KEY = 'volume'

const SCORE_BACKUP_TIME_EXPIRE = 5 * 60 * 1000

export const clearOutdatedScoreBackup = () => {
  if (localStorage.getItem(`${SCORE_BACKUP_KEY}.time`)) {
    localStorage.removeItem(SCORE_BACKUP_KEY)
    localStorage.removeItem(`${SCORE_BACKUP_KEY}.time`)
  }
}

export const storeScoreBackup = (name, encoded) => {
  let stored = JSON.parse(localStorage.getItem(SCORE_BACKUP_KEY) || '{}')
  stored[name] = { encoded, time: new Date().getTime() }
  localStorage.setItem(SCORE_BACKUP_KEY, JSON.stringify(stored))
}

export const getScoreBackup = name => {
  const stored = JSON.parse(localStorage.getItem(SCORE_BACKUP_KEY) || '{}')
  const data = stored[name] || {}
  if (new Date().getTime() - (data.time || 0) > SCORE_BACKUP_TIME_EXPIRE) {
    return null
  }
  return data.encoded
}

const SCORE_BACKUP_KEY = 'scoreBackup'
const SCORE_BACKUP_TIME_KEY = 'scoreBackup.time'
const VOLUME_KEY = 'volume'

const SCORE_BACKUP_TIME_LIMIT = 5 * 60 * 1000

export const storeScoreBackup = encrypted => {
  localStorage.setItem(SCORE_BACKUP_KEY, encrypted)
  localStorage.setItem(SCORE_BACKUP_TIME_KEY, new Date().getTime())
}

export const getScoreBackup = () => {
  const now = new Date().getTime()
  if (now) {
    const time = parseFloat(localStorage.getItem(SCORE_BACKUP_TIME_KEY))
    if (now - time < SCORE_BACKUP_TIME_LIMIT) {
      return localStorage.getItem(SCORE_BACKUP_KEY)
    }
  }
  return null
}

export const storeVolume = volume => {
  localStorage.setItem(VOLUME_KEY, volume)
}

export const getVolume = () => {
  return parseInt(localStorage.getItem(VOLUME_KEY) || '100')
}

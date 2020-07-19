import { playersOfTeams } from './team'

export const normalizeTeams = teams => {
  if (teams) {
    for (let team of teams) {
      team.players = team.players || []
    }
    return teams
  } else {
    return []
  }
}

export const normalizeButtons = buttons => {
  buttons.pushers = buttons.pushers || []
  buttons.pushTimes = buttons.pushTimes || []
  buttons.answerers = buttons.answerers || []
  return buttons
}

export const ordial = x => {
  const t = x % 1000
  if (t === 1 || (t > 20 && t % 10 === 1)) {
    return `${x}st`
  } else if (t === 2 || (t > 20 && t % 10 === 2)) {
    return `${x}nd`
  } else if (t === 3 || (t > 20 && t % 10 === 3)) {
    return `${x}rd`
  } else {
    return `${x}th`
  }
}

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const intKeys = obj => {
  return Object.keys(obj).map(key => parseInt(key))
}

export const parseNumber = text => {
  const i = parseInt(text)
  return isNaN(i) ? 0 : i
}

export const chanceText = (rule, teams) => {
  if (rule.rightNum === 1) {
    return 'シングルチャンス'
  } else if (rule.rightNum >= playersOfTeams(teams).length) {
    return 'エンドレスチャンス'
  } else if (rule.rightNum === 2) {
    return 'ダブルチャンス'
  } else if (rule.rightNum === 3) {
    return 'トリプルチャンス'
  } else {
    return `${rule.rightNum}チャンス`
  }
}

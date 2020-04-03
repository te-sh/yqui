import { playersOfTeams } from './team'

export const isMaster = (selfID, master) => (
  selfID === master
)

export const isPlayer = (selfID, teams) => (
  playersOfTeams(teams).includes(selfID)
)

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

export const ruleText = (rule, teams) => {
  return {
    chance: (() => {
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
    })(),
    correct: (() => {
      if (rule.pointCorrect > 0) {
        return `正解 ${rule.pointCorrect}ポイント`
      } else {
        return ''
      }
    })(),
    wrong: (() => {
      if (rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0) {
        let text = '誤答'
        if (rule.pointWrong !== 0) {
          text += ` ${rule.pointWrong}ポイント`
        }
        if (rule.batsuWrong !== 0) {
          text += ` ${rule.batsuWrong}バツ`
        }
        if (rule.lockWrong !== 0) {
          text += ` ${rule.lockWrong}休`
        }
        return text
      }
    })(),
    win: (() => {
      if (rule.winPoint.active) {
        return `勝ち抜け ${rule.winPoint.value}ポイント`
      } else {
        return '勝ち抜けなし'
      }
    })(),
    lose: (() => {
      if (rule.losePoint.active || rule.loseBatsu.active) {
        let text = '失格'
        if (rule.losePoint.active) {
          text += ` ${rule.losePoint.value}ポイント`
        }
        if (rule.loseBatsu.active) {
          text += ` ${rule.loseBatsu.value}バツ`
        }
        return text
      } else {
        return '失格なし'
      }
    })()
  }
}

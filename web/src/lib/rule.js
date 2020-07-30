export const initRule = {
  rightNum: 1,
  player: {
    pointCorrect: 1,
    bonusCorrect: 'none',
    pointWrong: 0,
    batsuWrong: 1,
    lockWrong: 0,
    updown: false,
    winPoint: { active: true, value: 7 },
    losePoint: { active: false, value: 0 },
    loseBatsu: { active: true, value: 3 }
  },
  team: {
    active: false,
    shareButton: false,
    point: 'sum',
    batsu: 'sum',
    shareLock: true,
    winPoint: { active: true, value: 7 },
    losePoint: { active: false, value: 0 },
    loseBatsu: { active: true, value: 3 }
  },
  board: {
    active: false,
    pointCorrect: 1,
    applyNormal: true
  },
  showPoint: true
}

export const chanceText = (rule, numPlayers) => {
  if (rule.rightNum === 1) {
    return 'シングルチャンス'
  } else if (rule.rightNum >= numPlayers) {
    return 'エンドレスチャンス'
  } else if (rule.rightNum === 2) {
    return 'ダブルチャンス'
  } else if (rule.rightNum === 3) {
    return 'トリプルチャンス'
  } else {
    return `${rule.rightNum}チャンス`
  }
}

export const winLoseText = rule => {
  const win = rule => {
    if (rule.winPoint.active) {
      return `勝ち抜け ${rule.winPoint.value}ポイント`
    } else {
      return '勝ち抜けなし'
    }
  }

  const lose = rule => {
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
  }

  return (
    `${win(rule)} ${lose(rule)}`
  )
}

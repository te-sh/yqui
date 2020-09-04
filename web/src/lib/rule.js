export const initRule = {
  rightNum: 1,
  player: {
    pointCorrect: 1,
    bonusCorrect: 'none',
    pointWrong: 0,
    batsuWrong: 1,
    lockWrong: 0,
    updown: false,
    winPlayers: 1,
    passQuiz: false,
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
    winPlayers: 1,
    passQuiz: false,
    winPoint: { active: true, value: 7 },
    losePoint: { active: false, value: 0 },
    loseBatsu: { active: true, value: 3 }
  },
  board: {
    active: false,
    pointCorrect: 1,
    applyNormal: true
  },
  other: {
    timer: {
      active: false,
      min: 0,
      sec: 0
    }
  },
  showPoint: true
}

export const chanceText = (simple, rule, numPlayers) => {
  const postfix = simple ? '' : 'チャンス'

  if (rule.rightNum === 1) {
    return 'シングル' + postfix
  } else if (rule.rightNum >= numPlayers) {
    return 'エンドレス' + postfix
  } else if (rule.rightNum === 2) {
    return 'ダブル' + postfix
  } else if (rule.rightNum === 3) {
    return 'トリプル' + postfix
  } else {
    return `${rule.rightNum}チャンス`
  }
}

export const pointText = simple => simple ? 'pt' : 'ポイント'
export const batsuText = simple => simple ? 'x' : 'バツ'

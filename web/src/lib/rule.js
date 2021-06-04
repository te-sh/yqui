export const initRule = {
  rightNum: 1,
  player: {
    initPoint: 0,
    initBatsu: 0,
    pointCorrect: 1,
    pointWrong: 0,
    batsuWrong: 1,
    lockWrong: 0,
    winPlayers: 1,
    winPoint: { active: true, value: 7, above: true },
    losePoint: { active: false, value: 0, above: false },
    loseBatsu: { active: true, value: 3, above: true },
    specialCorrect: {
      consBonus: false,
      passQuiz: false,
      survival: { active: false, value: -1 }
    },
    specialWrong: {
      updown: false,
      swedish: false,
      backstream: false,
      divide: false,
      belowLock: false
    },
    comprehensive: {
      active: false,
      calc: 'mul',
      winPoint: { active: true, value: 100, above: true }
    }
  },
  team: {
    active: false,
    shareButton: false,
    point: 'sum',
    batsu: 'sum',
    shareLock: true,
    winPlayers: 1,
    winPoint: { active: true, value: 7, above: true },
    losePoint: { active: false, value: 0, above: false },
    loseBatsu: { active: true, value: 3, above: true }
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
    },
    winLoseOrder: 'point'
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

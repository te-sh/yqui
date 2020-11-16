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
    winPoint: { active: true, value: 7 },
    losePoint: { active: false, value: 0 },
    loseBatsu: { active: true, value: 3 },
    specialCorrect: {
      consBonus: false
    },
    specialWrong: {
      updown: false,
      swedish: false
    }
  },
  team: {
    active: false,
    shareButton: false,
    point: 'sum',
    batsu: 'sum',
    shareLock: true,
    winPlayers: 1,
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
    passQuiz: false,
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

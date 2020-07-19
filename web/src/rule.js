export const initRule = {
  rightNum: 1,
  player: {
    pointCorrect: 1,
    bonusCorrect: 'none',
    pointWrong: 0,
    batsuWrong: 1,
    lockWrong: 0,
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

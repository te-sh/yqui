export const ordial = x => {
  const t = x % 1000
  if (t === 1 || (t > 20 && t % 10 === 1)) {
    return x.toString() + 'st'
  } else if (t === 2 || (t > 20 && t % 10 === 2)) {
    return x.toString() + 'nd'
  } else if (t === 3 || (t > 20 && t % 10 === 3)) {
    return x.toString() + 'rd'
  } else {
    return x.toString() + 'th'
  }
}

export const ruleText = (rule, attendees) => {
  return {
    chance: (() => {
      if (rule.rightNum === 1) {
        return 'シングルチャンス'
      } else if (rule.rightNum >= attendees.players.length) {
        return 'エンドレスチャンス'
      } else if (rule.rightNum === 2) {
        return 'ダブルチャンス'
      } else if (rule.rightNum === 3) {
        return 'トリプルチャンス'
      } else {
        return rule.rightNum.toString() + 'チャンス'
      }
    })(),
    correct: (() => {
      if (rule.pointCorrect > 0) {
        return '正解 ' + rule.pointCorrect + 'ポイント'
      } else {
        return ''
      }
    })(),
    wrong: (() => {
      if (rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0) {
        let text = '誤答'
        if (rule.pointWrong !== 0) {
          text += ' ' + rule.pointWrong + 'ポイント'
        }
        if (rule.batsuWrong !== 0) {
          text += ' ' + rule.batsuWrong + 'バツ'
        }
        if (rule.lockWrong !== 0) {
          text += ' ' + rule.lockWrong + '休'
        }
        return text
      }
    })(),
    win: (() => {
      if (rule.winPoint.active) {
        return '勝ち抜け ' + rule.winPoint.value + 'ポイント'
      } else {
        return '勝ち抜けなし'
      }
    })(),
    lose: (() => {
      if (rule.losePoint.active || rule.loseBatsu.active) {
        let text = '失格'
        if (rule.losePoint.active) {
          text += ' ' + rule.losePoint.value + 'ポイント'
        }
        if (rule.loseBatsu.active) {
          text += ' ' + rule.loseBatsu.value + 'バツ'
        }
        return text
      } else {
        return '失格なし'
      }
    })()
  }
}

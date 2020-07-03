import React from 'react'
import { Typography } from '@material-ui/core'

const CorrectWrongRule = ({ rule }) => {
  const correct = (() => {
    let text = `正解 ${rule.player.pointCorrect}ポイント`
    if (rule.player.bonusCorrect === 'cons') {
      text += ` (連答ボーナス)`
    }
    return text
  })()

  const wrong = (() => {
    if (rule.player.pointWrong !== 0 || rule.player.batsuWrong !== 0 || rule.player.lockWrong !== 0) {
      let text = '誤答'
      if (rule.player.pointWrong !== 0) {
        text += ` ${rule.player.pointWrong}ポイント`
      }
      if (rule.player.batsuWrong !== 0) {
        text += ` ${rule.player.batsuWrong}バツ`
      }
      if (rule.player.lockWrong !== 0) {
        text += ` ${rule.player.lockWrong}休`
      }
      return text
    }
  })()

  return (
    <Typography>{correct} {wrong}</Typography>
  )
}

export default CorrectWrongRule

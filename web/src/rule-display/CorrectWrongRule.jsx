import React from 'react'
import { Typography } from '@material-ui/core'

const CorrectWrongRule = ({ rule }) => {
  const correct = (() => {
    let text = `正解 ${rule.pointCorrect}ポイント`
    if (rule.bonusCorrect === 'cons') {
      text += ` (連答ボーナス)`
    }
    return text
  })()

  const wrong = (() => {
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
  })()

  return (
    <Typography>{correct} {wrong}</Typography>
  )
}

export default CorrectWrongRule

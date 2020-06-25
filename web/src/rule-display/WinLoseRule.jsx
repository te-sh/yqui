import React from 'react'
import { Typography } from '@material-ui/core'

const WinLoseRule = ({ rule }) => {
  const win = (() => {
    if (rule.winPoint.active) {
      return `勝ち抜け ${rule.winPoint.value}ポイント`
    } else {
      return '勝ち抜けなし'
    }
  })()

  const lose = (() => {
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

  return (
    <Typography>{win} {lose}</Typography>
  )
}

export default WinLoseRule

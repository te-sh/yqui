import React from 'react'
import { Typography } from '@material-ui/core'

const WinLoseRule = ({ rule }) => {
  const win = (() => {
    if (rule.player.winPoint.active) {
      return `勝ち抜け ${rule.player.winPoint.value}ポイント`
    } else {
      return '勝ち抜けなし'
    }
  })()

  const lose = (() => {
    if (rule.player.losePoint.active || rule.player.loseBatsu.active) {
      let text = '失格'
      if (rule.player.losePoint.active) {
        text += ` ${rule.player.losePoint.value}ポイント`
      }
      if (rule.player.loseBatsu.active) {
        text += ` ${rule.player.loseBatsu.value}バツ`
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

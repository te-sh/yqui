import React from 'react'
import { Typography } from '@material-ui/core'

const TeamWinLoseRule = ({ rule }) => {
  const win = (() => {
    if (rule.teamWinPoint.active) {
      return `勝ち抜け ${rule.teamWinPoint.value}ポイント`
    } else {
      return '勝ち抜けなし'
    }
  })()

  const lose = (() => {
    if (rule.teamLosePoint.active || rule.teamLoseBatsu.active) {
      let text = '失格'
      if (rule.teamLosePoint.active) {
        text += ` ${rule.teamLosePoint.value}ポイント`
      }
      if (rule.teamLoseBatsu.active) {
        text += ` ${rule.teamLoseBatsu.value}バツ`
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

export default TeamWinLoseRule

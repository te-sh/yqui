import React from 'react'
import { Typography } from '@material-ui/core'

const TeamWinLoseRule = ({ rule }) => {
  const win = (() => {
    if (rule.team.winPoint.active) {
      return `勝ち抜け ${rule.team.winPoint.value}ポイント`
    } else {
      return '勝ち抜けなし'
    }
  })()

  const lose = (() => {
    if (rule.team.losePoint.active || rule.team.loseBatsu.active) {
      let text = '失格'
      if (rule.team.losePoint.active) {
        text += ` ${rule.team.losePoint.value}ポイント`
      }
      if (rule.team.loseBatsu.active) {
        text += ` ${rule.team.loseBatsu.value}バツ`
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

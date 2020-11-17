import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { initRule, pointText, batsuText } from '../../lib/rule'
import PassQuizHelp from '../rule-help/PassQuizHelp'

const WinLoseRule = ({ simple, rule, passQuiz }) => {
  const aboveText = value => value ? '以上' : '以下'

  const win = rule => {
    const comprehensive = rule.comprehensive || initRule.player.comprehensive

    if (rule.winPoint.active || comprehensive.winPoint.active) {
      const point = `${rule.winPoint.value}${pointText(simple)}${aboveText(rule.winPoint.above)}`

      const compPoint = `${comprehensive.winPoint.value}総合${pointText(simple)}${aboveText(comprehensive.winPoint.above)}`

      return (
        <>
          {passQuiz && <>通過クイズ<PassQuizHelp size="small" /> </>}
          {<>勝ち抜け {rule.winPoint.active && point} {comprehensive.active && comprehensive.winPoint.active && compPoint}</>}
          {rule.winPlayers > 0 && <> {rule.winPlayers}人</>}
        </>
      )
    } else {
      return <>勝ち抜けなし</>
    }
  }

  const lose = rule => {
    if (rule.losePoint.active || rule.loseBatsu.active) {
      return (
        <>
          失格
          {rule.losePoint.active && <> {rule.losePoint.value}{pointText(simple)}{aboveText(rule.losePoint.above)}</>}
          {rule.loseBatsu.active && <> {rule.loseBatsu.value}{batsuText(simple)}{aboveText(rule.loseBatsu.above)}</>}
        </>
      )
    } else {
      return <>失格なし</>
    }
  }

  return (
    <Box>
      <Typography variant="body2">{win(rule)} {lose(rule)}</Typography>
    </Box>
  )
}

export default WinLoseRule

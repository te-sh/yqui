import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText, batsuText } from '../../lib/rule'
import PassQuizHelp from '../rule-help/PassQuizHelp'

const WinLoseRule = ({ simple, rule, passQuiz }) => {
  const aboveText = value => value ? '以上' : '以下'

  const win = rule => {
    if (rule.winPoint.active) {
      return (
        <>
          {passQuiz && <>通過クイズ<PassQuizHelp /> </>}
          {<>勝ち抜け {rule.winPoint.value}{pointText(simple)}{aboveText(rule.winPoint.above)}</>}
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

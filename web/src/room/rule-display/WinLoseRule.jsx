import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText, batsuText } from '../../lib/rule'
import PassQuizHelp from '../rule-help/PassQuizHelp'

const WinLoseRule = ({ simple, rule }) => {
  const win = rule => {
    if (rule.winPoint.active) {
      return (
        <>
          {rule.passQuiz && <>通過クイズ<PassQuizHelp /> </>}
          {<>勝ち抜け {rule.winPoint.value}{pointText(simple)}</>}
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
          {rule.losePoint.active && <> {rule.losePoint.value}{pointText(simple)}</>}
          {rule.loseBatsu.active && <> {rule.loseBatsu.value}{batsuText(simple)}</>}
        </>
      )
    } else {
      return <>失格なし</>
    }
  }

  return (
    <Box>
      <Typography>{win(rule)} {lose(rule)}</Typography>
    </Box>
  )
}

export default WinLoseRule

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import WinLoseRule from './WinLoseRule'

const BoardScoreRule = ({ rule }) => {
  const correct = (() => {
    return `正解 ${rule.board.pointCorrect}ポイント`
  })()

  return (
    <Box>
      <Typography variant="caption">ボードスコア</Typography>
      <Typography>{correct}</Typography>
      <WinLoseRule rule={rule.player} />
    </Box>
  )
}

export default BoardScoreRule

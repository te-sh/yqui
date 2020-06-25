import React from 'react'
import { Box, Typography } from '@material-ui/core'
import WinLoseRule from './WinLoseRule'

const BoardScoreRule = ({ rule }) => {
  const correct = (() => {
    return `正解 ${rule.boardPointCorrect}ポイント`
  })()

  return (
    <Box>
      <Typography variant="caption">ボードスコア</Typography>
      <Typography>{correct}</Typography>
      <WinLoseRule rule={rule} />
    </Box>
  )
}

export default BoardScoreRule

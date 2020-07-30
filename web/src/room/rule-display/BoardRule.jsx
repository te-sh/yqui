import React from 'react'
import { Box, Typography } from '@material-ui/core'
import WinLoseRule from './WinLoseRule'

const BoardRule = ({ rule }) => {
  const correct = (() => {
    return `正解 ${rule.board.pointCorrect}ポイント`
  })()

  return (
    <Box>
      <Box>
        <Typography variant="caption">ボードスコア</Typography>
      </Box>
      <Box>
        <Typography>{correct}</Typography>
      </Box>
      <Box>
        <Typography><WinLoseRule rule={rule.player} /></Typography>
      </Box>
    </Box>
  )
}

export default BoardRule

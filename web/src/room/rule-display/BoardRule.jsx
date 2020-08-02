import React from 'react'
import { Box, Typography } from '@material-ui/core'
import WinLoseRule from './WinLoseRule'

const BoardRule = ({ rule }) => {
  return (
    <Box>
      <Box>
        <Typography variant="caption">ボードスコア</Typography>
      </Box>
      <Box>
        <Typography>正解 {rule.board.pointCorrect}ポイント</Typography>
      </Box>
      <WinLoseRule rule={rule.player} />
    </Box>
  )
}

export default BoardRule

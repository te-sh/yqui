import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText } from '../../lib/rule'
import WinLoseRule from './WinLoseRule'

const BoardRule = ({ simple, rule }) => {
  return (
    <Box className="board-rule">
      <Box className="title">
        <Typography variant="caption">ボードスコア</Typography>
      </Box>
      <Box className="content">
        <Typography variant="body2">正解 {rule.board.pointCorrect}{pointText(simple)}</Typography>
        <WinLoseRule simple={simple} rule={rule.player} />
      </Box>
    </Box>
  )
}

export default BoardRule

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText } from '../../lib/rule'
import WinLoseRule from './WinLoseRule'

const BoardRule = ({ simple, rule }) => (
  <Box className="board-rule">
    <Box className="title">
      <Typography variant="caption">ボードスコア</Typography>
    </Box>
    <Box className="content">
      <Typography variant="body2">
        <Box component="span" className="rule-title">正解</Box>
        <Box component="span" className="rule-element" key="lock-wrong">
          {rule.board.pointCorrect}{pointText(simple)}
        </Box>
      </Typography>
      <WinLoseRule simple={simple} rule={rule.player} />
    </Box>
  </Box>
)

export default BoardRule

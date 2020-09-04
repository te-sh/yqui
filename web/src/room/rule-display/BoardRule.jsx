import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText } from '../../lib/rule'
import WinLoseRule from './WinLoseRule'

const BoardRule = ({ simple, rule }) => {
  return (
    <Box>
      <Box>
        <Typography variant="caption">ボードスコア</Typography>
      </Box>
      <Box>
        <Typography>正解 {rule.board.pointCorrect}{pointText(simple)}</Typography>
      </Box>
      <WinLoseRule simple={simple} rule={rule.player} />
    </Box>
  )
}

export default BoardRule

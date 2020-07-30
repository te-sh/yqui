import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { winLoseText } from '../../lib/rule'

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
        <Typography>{winLoseText(rule.player)}</Typography>
      </Box>
    </Box>
  )
}

export default BoardRule

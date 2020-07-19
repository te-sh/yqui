import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { winLoseText } from '../../rule'

const BoardRule = ({ rule }) => {
  const correct = (() => {
    return `正解 ${rule.board.pointCorrect}ポイント`
  })()

  return (
    <Box>
      <Typography variant="caption">ボードスコア</Typography>
      <Typography>{correct}</Typography>
      <Typography>{winLoseText(rule.player)}</Typography>
    </Box>
  )
}

export default BoardRule

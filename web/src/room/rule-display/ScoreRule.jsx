import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { correctWrongText, winLoseText } from '../../rule'

const ScoreRule = ({ rule }) => {
  const title = (() => {
    if (rule.board.active) {
      return '1着スコア'
    } else if (rule.team.active) {
      return '個人スコア'
    } else {
      return 'スコア'
    }
  })()

  return (
    <Box>
      <Typography variant="caption">{title}</Typography>
      <Typography>{correctWrongText(rule)}</Typography>
      <Typography visibility={!rule.board.active}>{winLoseText(rule.player)}</Typography>
    </Box>
  )
}

export default ScoreRule

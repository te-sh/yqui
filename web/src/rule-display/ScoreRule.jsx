import React from 'react'
import { Box, Typography } from '@material-ui/core'
import CorrectWrongRule from './CorrectWrongRule'
import WinLoseRule from './WinLoseRule'

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
      <CorrectWrongRule rule={rule} />
      {!rule.board.active ? <WinLoseRule rule={rule.player} /> : null}
    </Box>
  )
}

export default ScoreRule

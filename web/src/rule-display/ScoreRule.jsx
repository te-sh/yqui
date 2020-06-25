import React from 'react'
import { Box, Typography } from '@material-ui/core'
import CorrectWrongRule from './CorrectWrongRule'
import WinLoseRule from './WinLoseRule'

const ScoreRule = ({ rule, teams }) => {
  const title = (() => {
    if (rule.board) {
      return '1着スコア'
    } else if (teams.length > 1) {
      return '個人スコア'
    } else {
      return 'スコア'
    }
  })()

  return (
    <Box>
      <Typography variant="caption">{title}</Typography>
      <CorrectWrongRule rule={rule} />
      {!rule.board ? <WinLoseRule rule={rule} /> : null}
    </Box>
  )
}

export default ScoreRule

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import TeamPointBatsuRule from './TeamPointBatsuRule'
import TeamWinLoseRule from './TeamWinLoseRule'

const TeamScoreRule = ({ rule }) => {
  return (
    <Box>
      <Typography variant="caption">チームスコア</Typography>
      <TeamPointBatsuRule rule={rule} />
      <TeamWinLoseRule rule={rule} />
    </Box>
  )
}

export default TeamScoreRule

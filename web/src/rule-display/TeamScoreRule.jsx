import React from 'react'
import { Box, Typography } from '@material-ui/core'
import TeamPointBatsuRule from './TeamPointBatsuRule'
import WinLoseRule from './WinLoseRule'

const TeamScoreRule = ({ rule }) => {
  return (
    <Box>
      <Typography variant="caption">チームスコア</Typography>
      <TeamPointBatsuRule rule={rule} />
      <WinLoseRule rule={rule.team} />
    </Box>
  )
}

export default TeamScoreRule

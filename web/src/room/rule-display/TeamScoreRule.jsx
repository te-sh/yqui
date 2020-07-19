import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { winLoseText } from '../../rule'
import TeamPointBatsuRule from './TeamPointBatsuRule'

const TeamScoreRule = ({ rule }) => {
  return (
    <Box>
      <Typography variant="caption">チームスコア</Typography>
      <TeamPointBatsuRule rule={rule} />
      <Typography>{winLoseText(rule.team)}</Typography>
    </Box>
  )
}

export default TeamScoreRule

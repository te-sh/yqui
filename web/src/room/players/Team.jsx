import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Paper, Typography } from '@material-ui/core'
import Players from './Players'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import './Team.scss'

const Team = ({ team, index, movePlayer, updateTeams, sg, rule }) => {
  const teamScore = sg.team.scores.get(team.id)
  const multiTeamClass = { 'multi-team': rule.team.active }

  return (
    <Box key={team.id} className={classNames('team', multiTeamClass)}>
      <Box className="team-point" hidden={!rule.team.active}>
        <Typography align="center">
          チーム得点
        </Typography>
        <Paper className="player">
          <PlayerPoint score={teamScore} />
          <PlayerStatus score={teamScore} className="player-status" />
        </Paper>
      </Box>
      <Players team={team} teamIndex={index}
               movePlayer={movePlayer} updateTeams={updateTeams} />
    </Box>
  )
}

export default connect(
  state => ({
    sg: state.sg,
    rule: state.rule
  })
)(Team)

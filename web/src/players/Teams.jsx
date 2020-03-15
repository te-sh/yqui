import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Paper, Typography } from '@material-ui/core'
import update from 'immutability-helper'
import { send } from '../communicate'
import Players from './Players'
import PlayerPoint from './PlayerPoint'
import './Teams.scss'

const Teams = ({ className, ws, teams, teamScores }) => {
  const updateTeam = (team, teamIndex) => {
    const newTeams = update(teams, {
      [teamIndex]: { $set: team }
    })
    send.teams(ws, newTeams)
  }

  const multiTeamClass = { 'multi-team': teams.length > 1 }

  const list = teams.map((team, index) => (
    <Box key={team.id}
         className={classNames('team', multiTeamClass)}>
      <Box className="team-point" hidden={teams.length <= 1}>
        <Typography align="center">
          チーム得点
        </Typography>
        <PlayerPoint score={teamScores[team.id]} />
      </Box>
      <Players team={team} teamIndex={index}
               updateTeam={team => updateTeam(team, index)} />
    </Box>
  ))

  return (
    <Paper className={classNames(className, 'teams')}>
      {list}
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    teams: state.teams,
    teamScores: state.teamScores
  })
)(Teams)

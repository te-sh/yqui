import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Paper, Typography } from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_TEAMS } from '../../send'
import Players from './Players'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import './Teams.scss'

const Teams = ({ className, ws, teams, sg, rule }) => {
  const updateTeam = (team, teamIndex) => {
    const newTeams = update(teams, {
      [teamIndex]: { $set: team }
    })
    sendWs(ws, SEND_TEAMS, newTeams)
  }

  const multiTeamClass = { 'multi-team': rule.team.active }

  const list = teams.map((team, index) => {
    let teamScore = sg.team.scores.get(team.id)

    return (
      <Box key={team.id}
           className={classNames('team', multiTeamClass)}>
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
                 updateTeam={team => updateTeam(team, index)} />
      </Box>
    )
  })

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
    sg: state.sg,
    rule: state.rule
  })
)(Teams)

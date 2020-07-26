import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_TEAMS } from '../../lib/send'
import Team from './Team'
import './Teams.scss'

const Teams = ({ className, ws, teams }) => {
  const updateTeam = (team, index) => {
    const newTeams = update(teams, {
      [index]: { $set: team }
    })
    sendWs(ws, SEND_TEAMS, newTeams)
  }

  const teamComponent = (team, index) => (
    <Team key={team.id} team={team} index={index}
          updateTeam={team => updateTeam(team, index)} />
  )

  return (
    <Paper className={classNames(className, 'teams')}>
      {teams.map(teamComponent)}
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    teams: state.teams
  })
)(Teams)

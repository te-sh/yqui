import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { send } from '../communicate'
import Players from './Players'
import './Teams.scss'

const Teams = ({ className, ws, teams }) => {
  const updateTeam = (team, teamIndex) => {
    const newTeams = update(teams, {
      [teamIndex]: { $set: team }
    })
    send.teams(ws, newTeams)
  }

  const list = teams.map((team, index) => (
    <Players key={team.id}
             team={team} teamIndex={index}
             updateTeam={team => updateTeam(team, index)} />
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
    teams: state.teams
  })
)(Teams)

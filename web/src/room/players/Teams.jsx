import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import Team from './Team'
import './Teams.scss'

const Teams = ({ className, teams, editTeams }) => {
  const curTeams = editTeams ? editTeams : teams

  const teamComponent = (team, index) => (
    <Team key={index} team={team} index={index} />
  )

  return (
    <Paper className={classNames(className, 'teams')}>
      {curTeams.map(teamComponent)}
    </Paper>
  )
}

export default connect(
  state => ({
    teams: state.teams,
    editTeams: state.editTeams
  })
)(Teams)

import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import Team from './Team'
import './Teams.scss'

const Teams = ({ className, dispTeams }) => {
  const teamComponent = (team, index) => (
    <Team key={index} team={team} teamIndex={index} />
  )

  return (
    <Paper className={className}>
      {dispTeams.map(teamComponent)}
    </Paper>
  )
}

export default connect(
  state => ({
    dispTeams: state.dispTeams
  })
)(Teams)

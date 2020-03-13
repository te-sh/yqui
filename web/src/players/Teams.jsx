import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import Players from './Players'

const Teams = ({ className, teams }) => {
  const list = teams.map((team, index) => (
    <Players key={team.id} team={team} teamIndex={index} />
  ))

  return (
    <Box className={className}>
      {list}
    </Box>
  )
}

export default connect(
  state => ({
    teams: state.teams
  })
)(Teams)

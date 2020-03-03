import React from 'react'
import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import Player from './Player'

const Players = ({ attendees }) => {
  const list = attendees.players.map(player => (
    <Grid item key={player}>
      <Player player={player} />
    </Grid>
  ))

  return (
    <Paper className="players">
      <Grid container justify="center" alignItems="center">
        {list}
      </Grid>
    </Paper>
  )
}

export default connect(
  state => ({
    attendees: state.attendees
  })
)(Players)

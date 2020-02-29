import React from 'react'
import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import Player from './Player'

const Players = ({ room }) => {
  const list = room.players.map(player => (
    <Grid item key={player}>
      <Player player={room.users[player]} />
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
    room: state.room
  })
)(Players)

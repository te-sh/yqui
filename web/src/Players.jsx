import React from 'react'
import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import Player from './Player'

const Players = ({ props, state }) => {
  console.log(state.room)
  console.log(state.room.users)
  const list = state.room.players.map((player) => (
    <Grid item key={player}>
      <Player player={state.room.users[player]} />
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
  state => ({ state: {
    room: state.room
  }})
)(Players)

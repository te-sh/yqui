import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
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
    <Grid container justify="center" alignItems="center" className="full-height">
      {list}
    </Grid>
  )
}

export default connect(
  state => ({ state: {
    room: state.room
  }})
)(Players)

import React from 'react'
import { Paper, Typography } from '@material-ui/core'

const Player = props => {
  console.log(props)
  return (
    <Paper className="player">
      <Typography align="center">{props.player.name}</Typography>
    </Paper>
  )
}

export default Player

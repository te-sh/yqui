import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'

const Player = ({ player, answers }) => {
  const order = answers ? answers.findIndex(answer => answer.id === player.id) : -1

  return (
    <Paper className="player">
      <Typography align="center">{player.name}</Typography>
      <Typography align="center">{order >= 0 ? order + 1 : ""}</Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    answers: state.answers
  })
)(Player)

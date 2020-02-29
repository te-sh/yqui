import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

const Player = ({ player, answers, right }) => {
  const order = answers ? answers.findIndex(answer => answer.id === player.id) : -1

  const orderClass = classNames(
    'answer-order',
    { 'right': player.id == right }
  )

  return (
    <Paper className="player">
      <Typography align="center">{player.name}</Typography>
      <Typography align="center" className={orderClass}>
        <span className="answer-order-content">
          {order >= 0 ? order + 1 : ""}
        </span>
      </Typography>
      <Typography className="correct">{player.correct}</Typography>
      <Typography className="wrong">{player.wrong}</Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    answers: state.answers,
    right: state.right
  })
)(Player)

import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

const Player = ({ player, answers, right }) => {
  const order = answers ? answers.findIndex(answer => answer.id === player.id) : -1

  const orderClass = classNames(
    'decorate',
    { 'right': player.id === right }
  )

  return (
    <Paper className="player">
      <Box className="player-name">
        <Typography align="center">
          {player.name}
        </Typography>
      </Box>
      <Box className="answer-order">
        <Box className={orderClass}>
          <Typography align="center" className="content">
            {order >= 0 ? order + 1 : ""}
          </Typography>
        </Box>
      </Box>
      <Box className="correct">
        <Typography className="content">
          {player.correct}
        </Typography>
      </Box>
      <Box className="wrong">
        <Typography className="content">
          {player.wrong}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    answers: state.answers,
    right: state.right
  })
)(Player)

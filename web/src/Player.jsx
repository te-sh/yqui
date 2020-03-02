import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

const Player = ({ player, selfID, answers, right, rule }) => {
  const order = answers ? answers.findIndex(answer => answer === player.id) : -1

  const playerClass = classNames(
    'player',
    { 'right': right >= 0 && order === right }
  )

  const nameClass = player => classNames(
    'content',
    { 'self': selfID === player.id }
  )

  const orderClass = classNames(
    'content',
    { 'has-right': order < rule.rightNum }
  )

  const winOrLoseClass = player => classNames(
    'win-or-lose',
    { 'active': player.winOrder >= 0 || player.loseOrder >= 0 || player.lock > 0 }
  )

  const winOrLoseText = player => {
    if (player.winOrder >= 0) {
      let order = player.winOrder + 1
      return order.toString() +
          (order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th')
    } else if (player.loseOrder >= 0) {
      return 'Lose'
    } else if (player.lock >= 0) {
      return 'Lock ' + player.lock
    } else {
      return ''
    }
  }

  return (
    <Paper className={playerClass}>
      <Box className="player-name">
        <Typography align="center" className={nameClass(player)}>
          {player.name}
        </Typography>
      </Box>
      <Box className="answer-order">
        <Box className="decorate">
          <Typography align="center" className={orderClass}>
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
      <Box className={winOrLoseClass(player)}>
        <Typography className="content">
          {winOrLoseText(player)}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    answers: state.answers,
    right: state.right,
    rule: state.rule
  })
)(Player)

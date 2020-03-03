import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

const Player = ({ player, selfID, attendees, scores, buttons, rule }) => {
  const order = buttons.pushers ? buttons.pushers.indexOf(player) : -1
  const score = scores[player] || {}

  const playerClass = classNames(
    'player',
    { 'right': buttons.right >= 0 && buttons.right === order }
  )

  const nameClass = classNames(
    'content',
    { 'self': player === selfID }
  )

  const orderClass = classNames(
    'content',
    { 'has-right': order < rule.rightNum }
  )

  const winOrLoseClass = classNames(
    'win-or-lose',
    { 'active': score.win >= 0 || score.lose >= 0 || score.lock > 0 }
  )

  const winOrLoseText = () => {
    if (score.win >= 0) {
      let d = score.win + 1
      return d.toString() +
          (d === 1 ? 'st' : d === 2 ? 'nd' : d === 3 ? 'rd' : 'th')
    } else if (score.lose >= 0) {
      return 'Lose'
    } else if (score.lock > 0) {
      return 'Lock ' + score.lock
    } else {
      return ''
    }
  }

  return (
    <Paper className={playerClass}>
      <Box className="player-name">
        <Typography align="center" className={nameClass}>
          {attendees.users[player].name}
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
          {score.point}
        </Typography>
      </Box>
      <Box className="wrong">
        <Typography className="content">
          {score.batsu}
        </Typography>
      </Box>
      <Box className={winOrLoseClass}>
        <Typography className="content">
          {winOrLoseText()}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    attendees: state.attendees,
    scores: state.scores,
    buttons: state.buttons,
    rule: state.rule
  })
)(Player)

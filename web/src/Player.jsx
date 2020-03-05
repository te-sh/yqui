import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { ordial } from './util'
import './Player.scss'

const Player = ({ player, selfID, isMaster, users, scores, buttons, rule }) => {
  const order = buttons.pushers ? buttons.pushers.indexOf(player) : -1
  const user = users[player] || {}
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

  const pointText = isMaster || rule.showPoint ? score.point : '-'

  const batsuText = isMaster || rule.showPoint ? score.batsu : '-'

  const statusClass = classNames(
    'player-status',
    {
      'win': score.win > 0,
      'lose': score.lose > 0,
      'lock': score.lock > 0
    }
  )

  const statusText = (() => {
    if (score.win > 0) {
      return ordial(score.win)
    } else if (score.lose > 0) {
      return 'Lose'
    } else if (score.lock > 0) {
      return 'Lock ' + score.lock
    } else {
      return ''
    }
  })()

  return (
    <Paper className={playerClass}>
      <Box className="player-name">
        <Typography align="center" className={nameClass}>
          {user.name}
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
          {pointText}
        </Typography>
      </Box>
      <Box className="wrong">
        <Typography className="content">
          {batsuText}
        </Typography>
      </Box>
      <Box className={statusClass}>
        <Typography className="content">
          {statusText}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    isMaster: state.isMaster,
    users: state.users,
    scores: state.scores,
    buttons: state.buttons,
    rule: state.rule
  })
)(Player)

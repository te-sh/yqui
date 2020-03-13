import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import numbro from 'numbro'
import PlayerName from './PlayerName'
import PlayerStatus from './PlayerStatus'
import './Player.scss'

const Player = ({ player, isMaster, scores, buttons, rule }) => {
  const order = buttons.pushers.indexOf(player)
  const right = order === buttons.answerers.length ? player : -1
  const score = scores[player] || {}

  const pushOrderClass = classNames(
    'push-order',
    { 'pushed': order >= 0 }
  )

  const pushSpeed = (() => {
    if (order >= 0) {
      const s = buttons.pushTimes[order] - buttons.pushTimes[0]
      if (s < 1000) {
        return `${s}ms`
      } else if (s < 10000) {
        return `${numbro(s / 1000).format({ mantissa: 2 })}s`
      } else if (s < 100000) {
        return `${numbro(s / 1000).format({ mantissa: 1 })}s`
      } else {
        return `${numbro(s / 1000).format({ mantissa: 0 })}s`
      }
    } else {
      return ''
    }
  })()

  const consText = (() => {
    if (rule.bonusCorrect === "cons" && score.cons > 0) {
      return `+${score.cons}`
    } else {
      return ''
    }
  })()

  const playerClass = classNames(
    'player',
    { 'right': right >= 0 }
  )

  const orderClass = classNames(
    'content',
    { 'has-right': order < rule.rightNum }
  )

  const pointText = isMaster || rule.showPoint ? score.point : '-'

  const batsuText = isMaster || rule.showPoint ? score.batsu : '-'

  return (
    <Box className="player-container">
      <Box className="player-above">
        <Paper className={pushOrderClass}>
          <Typography align="center" className={orderClass}>
            {order >= 0 ? order + 1 : ""}
          </Typography>
        </Paper>
        <Box className="push-speed">
          <Typography variant="caption">
            {pushSpeed}
          </Typography>
        </Box>
        <Box className="cons">
          <Typography>
            {consText}
          </Typography>
        </Box>
      </Box>
      <Paper className={playerClass}>
        <PlayerName className="player-name"
                    player={player} right={right} />
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
        <PlayerStatus score={score} className="player-status" />
      </Paper>
    </Box>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    isMaster: state.isMaster,
    scores: state.scores,
    buttons: state.buttons,
    rule: state.rule
  })
)(Player)

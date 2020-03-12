import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import numbro from 'numbro'
import PlayerName from './PlayerName'
import PlayerStatus from './PlayerStatus'
import './Player.scss'

const Player = ({ item, isMaster, scores, buttons, rule }) => {
  const [order, right] = (() => {
    if (item.teamGame) {
      let orders = item.team.map(id => buttons.pushers.indexOf(id))
      let i = orders.findIndex(order => order >= 0)
      if (i < 0) {
        return [-1, -1]
      } else {
        let order = orders[i]
        let right = order === buttons.answerers.length ? item.team[i] : -1
        return [order, right]
      }
    } else {
      let order = buttons.pushers.indexOf(item.player)
      let right = order === buttons.answerers.length ? item.player : -1
      return [order, right]
    }
  })()

  const score = (item.teamGame ? scores[item.team[0]] : scores[item.player]) || {}

  const answerOrderClass = classNames(
    'answer-order',
    { 'pushed': order >= 0 }
  )

  const answerSpeed = (() => {
    if (order >= 0) {
      const s = buttons.pushTimes[order] - buttons.pushTimes[0];
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
        <Paper className={answerOrderClass}>
          <Typography align="center" className={orderClass}>
            {order >= 0 ? order + 1 : ""}
          </Typography>
        </Paper>
        <Box className="answer-speed">
          <Typography variant="caption">
            {answerSpeed}
          </Typography>
        </Box>
      </Box>
      <Paper className={playerClass}>
        <PlayerName className="player-name"
                    item={item} right={right} />
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

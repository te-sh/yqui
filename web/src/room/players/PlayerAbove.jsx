import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import { TrendingUp } from '@material-ui/icons'
import { classNamesK, readableTime } from '../../lib/util'
import './PlayerAbove.scss'

const PlayerAbove = ({ order, delay, score, rule }) => {
  const pushOrderClass = classNamesK('push-order', {
    pushed: order > 0
  })

  const pushOrderContentClass = classNamesK('push-order-content', {
    hasRight: order <= rule.rightNum
  })

  const showConsCorrect = rule.player.specialCorrect.consBonus && score.consCorrect > 0

  const consCorrect = (
    <Typography className="cons-correct">
      <TrendingUp style={{ verticalAlign: 'bottom', transform: 'scaleX(0.7)', marginRight: -4 }} />{score.consCorrect}
    </Typography>
  )

  const showPassSeat = rule.player.specialCorrect.passQuiz && score.passSeat

  const passSeat = (
    <Typography className="pass-seat">通過席</Typography>
  )

  const extComponent = (
    <Box className="ext">
      {showConsCorrect && consCorrect}
      {showPassSeat && passSeat}
    </Box>
  )

  return (
    <Box className="player-above">
      <Paper className={pushOrderClass}>
        <Typography align="center"
                    className={pushOrderContentClass}>
          {order > 0 && order}
        </Typography>
      </Paper>
      <Box className="push-speed">
        <Typography variant="caption">
          {delay >= 0 && readableTime(delay)}
        </Typography>
      </Box>
      {extComponent}
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule
  })
)(PlayerAbove)

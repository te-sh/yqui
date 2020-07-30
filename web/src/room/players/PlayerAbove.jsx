import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { readableTime } from '../../lib/util'
import './PlayerAbove.scss'

const PlayerAbove = ({ order, delay, score, rule }) => {
  const pushOrderClass = classNames('push-order', {
    'pushed': order >= 0
  })

  const pushOrderContentClass = classNames('push-order-content', {
    'has-right': order < rule.rightNum
  })

  const pushSpeed = delay >= 0 ? readableTime(delay) : null

  const extText = (() => {
    if (rule.player.bonusCorrect === "cons" && score.cons > 0) {
      return `+${score.cons}`
    } else if (rule.player.passQuiz && score.passSeat) {
      return '通過席'
    } else {
      return ''
    }
  })()

  return (
    <Box className="player-above">
      <Paper className={pushOrderClass}>
        <Typography align="center"
                    className={pushOrderContentClass}>
          {order >= 0 ? order + 1 : ''}
        </Typography>
      </Paper>
      <Box className="push-speed">
        <Typography variant="caption">
          {pushSpeed}
        </Typography>
      </Box>
      <Box className="cons">
        <Typography>
          {extText}
        </Typography>
      </Box>
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule
  })
)(PlayerAbove)

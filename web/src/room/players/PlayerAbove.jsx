import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { readableTime } from '../../util'
import './PlayerAbove.scss'

const PlayerAbove = ({ order, score, buttons, rule }) => {
  const pushOrderClass = classNames('push-order', {
    'pushed': order >= 0
  })

  const pushOrderContentClass = classNames('push-order-content', {
    'has-right': order < rule.rightNum
  })

  const pushSpeed = (() => {
    if (order >= 0) {
      return readableTime(buttons.pushTimes[order] - buttons.pushTimes[0])
    } else {
      return ''
    }
  })()

  const consText = (() => {
    if (rule.player.bonusCorrect === "cons" && score.cons > 0) {
      return `+${score.cons}`
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
          {consText}
        </Typography>
      </Box>
    </Box>
  )
}

export default connect(
  state => ({
    buttons: state.buttons,
    rule: state.rule
  })
)(PlayerAbove)

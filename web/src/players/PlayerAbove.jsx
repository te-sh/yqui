import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import numbro from 'numbro'
import './PlayerAbove.scss'

const PlayerAbove = ({ order, score, buttons, rule }) => {
  const pushOrderClass = { 'pushed': order >= 0 }
  const pushOrderContentClass = { 'has-right': order < rule.rightNum }

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

  return (
    <Box className="player-above">
      <Paper className={classNames('push-order', pushOrderClass)}>
        <Typography align="center"
                    className={classNames('push-order-content', pushOrderContentClass)}>
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
  )
}

export default connect(
  state => ({
    buttons: state.buttons,
    rule: state.rule
  })
)(PlayerAbove)

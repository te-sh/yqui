import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { minSecTime } from '../../lib/util'

const Player = ({ className, hidden, rule, timer }) => {
  const timerComponent = (
    <Box className="timer">
      <Typography>
        タイマー
      </Typography>
      <Typography variant="h6"
                  className={classNames('timer-remaining', { running: timer.running })}>
        {minSecTime(timer.remaining)}
      </Typography>
    </Box>
  )

  return (
    <Box className={classNames(className, 'player-subactions', { hidden })}>
      {rule.other.timer.active && timerComponent}
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    timer: state.timer
  })
)(Player)

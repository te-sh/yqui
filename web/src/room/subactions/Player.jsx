import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import { minSecTime } from '../../lib/util'

const Player = ({ className, rule, timer }) => {
  const timerComponent = (
    <Box className="timer">
      <Typography>
        タイマー{timer.running ? '駆動' : '停止'}中
      </Typography>
      <Typography variant="h6" className="timer-remaining">
        {minSecTime(timer.remaining)}
      </Typography>
    </Box>
  )

  return (
    <Paper className={className}>
      <Box className="subactions-content">
        {rule.other.timer.active && timerComponent}
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    timer: state.timer
  })
)(Player)

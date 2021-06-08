import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
import { Pause, PlayArrow } from '@material-ui/icons'
import classNames from 'classnames'
import { minSecTime } from '../../lib/util'
import { sendWs, TOGGLE_TIMER } from '../../lib/send'
import './Timer.scss'

const Timer = ({ className, user, timer, rule }) => {
  const toggleTimer = () => {
    sendWs(TOGGLE_TIMER)
  }

  const buttons = (
    <>
      <IconButton size="small"
                  className="start-timer-button"
                  disabled={timer.running}
                  onClick={toggleTimer}>
        <PlayArrow />
      </IconButton>
      <IconButton size="small"
                  className="pause-timer-button"
                  disabled={!timer.running}
                  onClick={toggleTimer}>
        <Pause />
      </IconButton>
    </>
  )

  const component = (
    <Box className={classNames(className, 'timer')}>
      <Typography>
        タイマー
      </Typography>
      <Typography variant="h6"
                  className={classNames('timer-remaining', { running: timer.running })}>
        {minSecTime(timer.remaining)}
      </Typography>
      {user.isMaster ? buttons : null }
    </Box>
  )

  return rule.other.timer.active ? component : null
}

export default connect(
  state => ({
    user: state.user,
    timer: state.timer,
    rule: state.rule
  })
)(Timer)

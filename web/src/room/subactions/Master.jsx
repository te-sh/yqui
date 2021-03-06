import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import classNames from 'classnames'
import update from 'immutability-helper'
import { minSecTime } from '../../lib/util'
import {
  sendWs, SEND_ALL_CLEAR, SEND_WIN_TOP, SEND_LOSE_BOTTOM,
  SEND_RULE, SEND_TOGGLE_TIMER
} from '../../lib/send'
import { clearEditBoards } from '../../redux/actions'
import './Master.scss'

const Master = ({ className, hidden, rule, timer, clearEditBoards }) => {
  const onAllClear = () => {
    clearEditBoards()
    sendWs(SEND_ALL_CLEAR)
  }

  const winTop = () => {
    sendWs(SEND_WIN_TOP)
  }

  const loseBottom = () => {
    sendWs(SEND_LOSE_BOTTOM)
  }

  const toggleTimer = () => {
    sendWs(SEND_TOGGLE_TIMER)
  }

  const toggleShowPoint = evt => {
    sendWs(SEND_RULE, update(rule, {
      showPoint: { $set: evt.target.checked }
    }))
  }

  const timerComponent = (
    <Box className="timer">
      <Button variant="outlined" color="default" className="toggle-timer-button"
              onClick={toggleTimer}>
        タイマー{timer.running ? '停止' : '駆動'}
      </Button>
      <Typography variant="h6"
                  className={classNames('timer-remaining', { running: timer.running })}>
        {minSecTime(timer.remaining)}
      </Typography>
    </Box>
  )

  return (
    <Box className={classNames(className, 'master-subactions', { hidden })}>
      <Button variant="outlined" color="default" className="all-clear-button"
              onClick={onAllClear}>
        オールクリア
      </Button>
      <Button variant="outlined" color="default" className="win-top-button"
              onClick={winTop}>
        最上位勝ち抜け
      </Button>
      <Button variant="outlined" color="default" className="lose-bottom-button"
              onClick={loseBottom}>
        最下位失格
      </Button>
      {rule.other.timer.active && timerComponent}
      <Box className="show-point">
        <FormControlLabel
          control={
            <Checkbox color="default" className="show-point-check"
                      checked={rule.showPoint}
                      onChange={toggleShowPoint} />
          }
          label="ポイント表示" />
      </Box>
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    timer: state.timer
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Master)

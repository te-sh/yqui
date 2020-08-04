import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, Checkbox, FormControlLabel, Paper
} from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_RULE, SEND_TOGGLE_TIMER } from '../../lib/send'

const Master = ({ className, rule, timer }) => {
  const toggleShowPoint = evt => {
    sendWs(SEND_RULE, update(rule, {
      showPoint: { $set: evt.target.checked }
    }))
  }

  const toggleTimer = () => {
    sendWs(SEND_TOGGLE_TIMER)
  }

  const timerComponent = (
    <>
      <Button variant="outlined" color="default"
              onClick={toggleTimer}>
        タイマー{timer.running ? '停止' : '駆動'}
      </Button>
    </>
  )

  return (
    <Paper className={className}>
      <Box className="subactions-content">
        {rule.timer.active && timerComponent}
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.showPoint}
                      onChange={toggleShowPoint} />
          }
          label="ポイント表示" />
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    timer: state.timer
  })
)(Master)

import React from 'react'
import { connect } from 'react-redux'
import { Box, Checkbox, FormControlLabel, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_RULE } from '../../lib/send'

const Master = ({ className, rule }) => {
  const onToggleShowPoint = evt => {
    sendWs(SEND_RULE, update(rule, {
      showPoint: { $set: evt.target.checked }
    }))
  }

  return (
    <Paper className={className}>
      <Box className="subactions-content">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.showPoint}
                      onChange={onToggleShowPoint} />
          }
          label="ポイント表示" />
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule
  })
)(Master)

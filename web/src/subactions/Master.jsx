import React from 'react'
import { connect } from 'react-redux'
import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@material-ui/core'
import { send } from '../communicate'

const Master = ({ className, ws, rule, ruleText }) => {
  const onToggleShowPoint = evt => {
    send.rule(ws, { showPoint: evt.target.checked })
  }

  return (
    <Paper className={className}>
      <Box className="subactions-content subactions-rule">
        <Typography>
          {ruleText.chance} {ruleText.correct} {ruleText.wrong}
        </Typography>
        <Typography>
          {ruleText.win} {ruleText.lose}
        </Typography>
      </Box>
      <Box className="subactions-content subactions-actions">
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
    ws: state.ws,
    rule: state.rule,
    ruleText: state.ruleText
  })
)(Master)

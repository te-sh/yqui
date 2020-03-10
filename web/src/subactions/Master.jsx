import React from 'react'
import { connect } from 'react-redux'
import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@material-ui/core'
import { send } from '../communicate'

const Master = ({ ws, rule, ruleText }) => {
  const [showPoint, setShowPoint] = React.useState(true)

  React.useEffect(
    () => {
      setShowPoint(rule.showPoint)
    },
    [rule.showPoint]
  )

  const changeShowPoint = evt => {
    send.rule(ws, { showPoint: evt.target.checked })
  }

  return (
    <Paper className="subactions">
      <Box className="subactions-rule">
        <Typography>
          {ruleText.chance} {ruleText.correct} {ruleText.wrong}
        </Typography>
        <Typography>
          {ruleText.win} {ruleText.lose}
        </Typography>
      </Box>
      <Box className="subactions-actions">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={showPoint}
                      onChange={changeShowPoint} />
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

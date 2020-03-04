import React from 'react'
import { connect } from 'react-redux'
import { Checkbox, FormControlLabel, Paper } from '@material-ui/core'
import { send } from './communicate'

const Misc = ({ ws }) => {
  return (
    <Paper className="mix-display">
      <div className="mix-actions">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      onClick={evt => send.showPoint(ws, evt.target.checked)} />
          }
          label="ポイント表示" />
      </div>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws
  })
)(Misc)

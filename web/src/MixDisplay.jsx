import React from 'react'
import { connect } from 'react-redux'
import { Checkbox, FormControlLabel, Paper } from '@material-ui/core'
import classNames from 'classnames'
import { send } from './communicate'

const MixDisplay = ({ ws, isMaster, rule }) => {
  const [showPoint, setShowPoint] = React.useState(true)

  React.useEffect(
    () => {
      setShowPoint(rule.showPoint === undefined || rule.showPoint)
    },
    [rule.showPoint]
  )

  const actionsClass = classNames(
    'mix-actions',
    { 'active': isMaster }
  )

  return (
    <Paper className="mix-display">
      <div className={actionsClass}>
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={showPoint}
                      onChange={evt => send.showPoint(ws, evt.target.checked)} />
          }
          label="ポイント表示" />
      </div>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    isMaster: state.isMaster,
    rule: state.rule
  })
)(MixDisplay)

import React from 'react'
import {
  Checkbox, FormControlLabel, FormGroup, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'

const OtherRule = ({ rule, changeRule }) => {
  const changeTimeraceActive = value => {
    changeRule(update(rule, { timerace: { active: { $set: value } } }))
  }

  const changeTimeraceMin = value => {
    changeRule(update(rule, { timerace: { min: { $set: parseNumber(value) } } }))
  }

  const changeTimeraceSec = value => {
    changeRule(update(rule, { timerace: { sec: { $set: parseNumber(value) } } }))
  }

  return (
    <>
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.timerace.active}
                      onChange={evt => changeTimeraceActive(evt.target.checked)} />
          }
          label="タイムレース" />
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormGroup row={true}>
          <TextField label="分" type="number"
                     disabled={!rule.timerace.active}
                     InputProps={{ required: true, inputProps: { min: 0 } }}
                     value={rule.timerace.min}
                     onChange={evt => changeTimeraceMin(evt.target.value)} />
          <TextField label="秒" type="number"
                     disabled={!rule.timerace.active}
                     InputProps={{ required: true, inputProps: { min: 0, max: 59 } }}
                     value={rule.timerace.sec}
                     onChange={evt => changeTimeraceSec(evt.target.value)} />
        </FormGroup>
      </FormGroup>
    </>
  )
}

export default OtherRule

import React from 'react'
import {
  Checkbox, FormControlLabel, FormGroup, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import PassQuizHelp from '../rule-help/PassQuizHelp'

const OtherRule = ({ rule, changeRule }) => {
  const changePassQuiz = value => {
    changeRule(update(rule, { passQuiz: { $set: value } }))
  }

  const changeTimerActive = value => {
    changeRule(update(rule, { timer: { active: { $set: value } } }))
  }

  const changeTimerMin = value => {
    changeRule(update(rule, { timer: { min: { $set: parseNumber(value) } } }))
  }

  const changeTimerSec = value => {
    changeRule(update(rule, { timer: { sec: { $set: parseNumber(value) } } }))
  }

  return (
    <>
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.passQuiz}
                      onChange={evt => changePassQuiz(evt.target.checked)} />
          }
          label={<>通過クイズ<PassQuizHelp /></>} />
      </FormGroup>
      <FormGroup className="rule-group">
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Checkbox color="default"
                        checked={rule.timer.active}
                        onChange={evt => changeTimerActive(evt.target.checked)} />
            }
            label="タイマー" />
          <TextField label="分" type="number"
                     disabled={!rule.timer.active}
                     InputProps={{ required: true, inputProps: { min: 0 } }}
                     value={rule.timer.min}
                     onChange={evt => changeTimerMin(evt.target.value)} />
          <TextField label="秒" type="number"
                     disabled={!rule.timer.active}
                     InputProps={{ required: true, inputProps: { min: 0, max: 59 } }}
                     value={rule.timer.sec}
                     onChange={evt => changeTimerSec(evt.target.value)} />
        </FormGroup>
      </FormGroup>
    </>
  )
}

export default OtherRule

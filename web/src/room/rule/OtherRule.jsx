import React from 'react'
import {
  FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Switch, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import PointHelp from '../rule-help/win-lose/PointHelp'
import PointAndBatsuHelp from '../rule-help/win-lose/PointAndBatsuHelp'
import CompPointHelp from '../rule-help/win-lose/CompPointHelp'
import CompPointAndPointHelp from '../rule-help/win-lose/CompPointAndPointHelp'

const OtherRule = ({ rule, changeRule, comprehensive }) => {
  const changeShowWinTimes = value => {
    changeRule(update(rule, { showWinTimes: { $set: value } }))
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

  const changeWinLoseOrder = value => {
    changeRule(update(rule, { winLoseOrder: { $set: value } }))
  }

  return (
    <>
      <FormGroup className="rule-group">
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Switch color="primary" className="show-win-times"
                      checked={rule.showWinTimes}
                      onChange={evt => changeShowWinTimes(evt.target.checked)} />
            }
            label="勝抜回数表示" />
        </FormGroup>
      </FormGroup>
      <FormGroup className="rule-group">
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Switch color="primary" className="timer"
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
      <FormGroup className="rule-group">
        <FormLabel component="legend">
          最上位勝抜と最下位失格の優先順位
        </FormLabel>
        <RadioGroup value={rule.winLoseOrder}
                    onChange={evt => changeWinLoseOrder(evt.target.value)}>
          <FormControlLabel
            value="point" className="point"
            control={<Radio />}
            label={<>ポイント<PointHelp /></>} />
          <FormControlLabel
            value="point-and-batsu" className="point-and-batsu"
            control={<Radio />}
            label={<>ポイント, 同じならバツ<PointAndBatsuHelp /></>} />
          <FormControlLabel
            value="comp-point" className="comp-point"
            control={<Radio />}
            disabled={!comprehensive}
            label={<>総合ポイント<CompPointHelp /></>} />
          <FormControlLabel
            value="comp-point-and-point" className="comp-point-and-point"
            control={<Radio />}
            disabled={!comprehensive}
            label={<>総合ポイント, 同じならポイント<CompPointAndPointHelp /></>} />
        </RadioGroup>
      </FormGroup>
    </>
  )
}

export default OtherRule

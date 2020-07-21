import React from 'react'
import {
  Checkbox, FormControl, FormGroup, FormLabel,
  InputLabel, MenuItem, Select, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'

const PlayerRule = ({ rule, changeRule }) => {
  const changePointCorrect = value => {
    changeRule(update(rule, { pointCorrect: { $set: parseNumber(value) } }))
  }

  const changeBonusCorrect = value => {
    changeRule(update(rule, { bonusCorrect: { $set: value } }))
  }

  const changePointWrong = value => {
    changeRule(update(rule, { pointWrong: { $set: parseNumber(value) } }))
  }

  const changeBatsuWrong = value => {
    changeRule(update(rule, { batsuWrong: { $set: parseNumber(value) } }))
  }

  const changeLockWrong = value => {
    changeRule(update(rule, { lockWrong: { $set: parseNumber(value) } }))
  }

  const changeWinPointActive = value => {
    changeRule(update(rule, { winPoint: { active: { $set: value } } }))
  }

  const changeWinPointValue = value => {
    changeRule(update(rule, { winPoint: { value: { $set: parseNumber(value) } } }))
  }

  const changeLosePointActive = value => {
    changeRule(update(rule, { losePoint: { active: { $set: value } } }))
  }

  const changeLosePointValue = value => {
    changeRule(update(rule, { losePoint: { value: { $set: parseNumber(value) } } }))
  }

  const changeLoseBatsuActive = value => {
    changeRule(update(rule, { loseBatsu: { active: { $set: value } } }))
  }

  const changeLoseBatsuValue = value => {
    changeRule(update(rule, { loseBatsu: { value: { $set: parseNumber(value) } } }))
  }

  return (
    <>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     value={rule.pointCorrect}
                     onChange={evt => changePointCorrect(evt.target.value)} />
          <FormControl>
            <InputLabel id="bonus-correct-label">ボーナス</InputLabel>
            <Select labelId="bonus-correct-label"
                    value={rule.bonusCorrect}
                    onChange={evt => changeBonusCorrect(evt.target.value)}>
              <MenuItem value="none">なし</MenuItem>
              <MenuItem value="cons">連答</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          誤答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     value={rule.pointWrong}
                     onChange={evt => changePointWrong(evt.target.value)} />
          <TextField label="バツ" type="number"
                     value={rule.batsuWrong}
                     onChange={evt => changeBatsuWrong(evt.target.value)} />
          <TextField label="休み" type="number"
                     value={rule.lockWrong}
                     onChange={evt => changeLockWrong(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          勝ち抜け
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" checked={rule.winPoint.active}
                    onChange={evt => changeWinPointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     disabled={!rule.winPoint.active}
                     value={rule.winPoint.value}
                     onChange={evt => changeWinPointValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          失格
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" checked={rule.losePoint.active}
                    onChange={evt => changeLosePointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     disabled={!rule.losePoint.active}
                     value={rule.losePoint.value}
                     onChange={evt => changeLosePointValue(evt.target.value)} />
          <Checkbox color="default" checked={rule.loseBatsu.active}
                    onChange={evt => changeLoseBatsuActive(evt.target.checked)} />
          <TextField label="バツ" type="number"
                     disabled={!rule.loseBatsu.active}
                     value={rule.loseBatsu.value}
                     onChange={evt => changeLoseBatsuValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
    </>
  )
}

export default PlayerRule

import React from 'react'
import {
  Checkbox, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import SpecialCorrectRule from './SpecialCorrectRule'
import SpecialWrongRule from './SpecialWrongRule'

const NormalRule = ({ rule, changeRule }) => {
  const changePointCorrect = value => {
    changeRule(update(rule, { pointCorrect: { $set: parseNumber(value) } }))
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

  const changeWinPointAbove = value => {
    changeRule(update(rule, { winPoint: { above: { $set: value } } }))
  }

  const changeWinPlayers = value => {
    changeRule(update(rule, { winPlayers: { $set: parseNumber(value) } }))
  }

  const changeLosePointActive = value => {
    changeRule(update(rule, { losePoint: { active: { $set: value } } }))
  }

  const changeLosePointValue = value => {
    changeRule(update(rule, { losePoint: { value: { $set: parseNumber(value) } } }))
  }

  const changeLosePointAbove = value => {
    changeRule(update(rule, { losePoint: { above: { $set: value } } }))
  }

  const changeLoseBatsuActive = value => {
    changeRule(update(rule, { loseBatsu: { active: { $set: value } } }))
  }

  const changeLoseBatsuValue = value => {
    changeRule(update(rule, { loseBatsu: { value: { $set: parseNumber(value) } } }))
  }

  const changeLoseBatsuAbove = value => {
    changeRule(update(rule, { loseBatsu: { above: { $set: value } } }))
  }

  const changeSpecialCorrect = value => {
    changeRule(update(rule, { specialCorrect: { $set: value } }))
  }

  const changeSpecialWrong = value => {
    changeRule(update(rule, { specialWrong: { $set: value } }))
  }

  const sw = rule.specialWrong
  return (
    <>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正解
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     className="point-correct"
                     InputProps={{ required: true }}
                     value={rule.pointCorrect}
                     onChange={evt => changePointCorrect(evt.target.value)} />
          <SpecialCorrectRule rule={rule.specialCorrect}
                              changeRule={changeSpecialCorrect} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          誤答
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     className="point-wrong"
                     disabled={sw.updown || sw.backstream || sw.divide}
                     InputProps={{ required: true }}
                     value={rule.pointWrong}
                     onChange={evt => changePointWrong(evt.target.value)} />
          <TextField label="バツ" type="number"
                     className="batsu-wrong"
                     disabled={sw.swedish}
                     InputProps={{ required: true }}
                     value={rule.batsuWrong}
                     onChange={evt => changeBatsuWrong(evt.target.value)} />
          <TextField label="休み" type="number"
                     className="lock-wrong"
                     disabled={sw.belowLock}
                     InputProps={{ required: true, inputProps: { min: 0 } }}
                     value={rule.lockWrong}
                     onChange={evt => changeLockWrong(evt.target.value)} />
          <SpecialWrongRule rule={rule.specialWrong}
                            changeRule={changeSpecialWrong} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          勝抜
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" className="win-point-active"
                    checked={rule.winPoint.active}
                    onChange={evt => changeWinPointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     className="win-point-value"
                     disabled={!rule.winPoint.active}
                     InputProps={{ required: true }}
                     value={rule.winPoint.value}
                     onChange={evt => changeWinPointValue(evt.target.value)} />
          <FormGroup>
            <InputLabel id="win-point-above">&nbsp;</InputLabel>
            <Select labelId="win-point-above"
                    className="win-point-above"
                    disabled={!rule.winPoint.active}
                    value={rule.winPoint.above}
                    onChange={evt => changeWinPointAbove(evt.target.value)}>
              <MenuItem value={true}>以上</MenuItem>
              <MenuItem value={false}>以下</MenuItem>
            </Select>
          </FormGroup>
          <TextField label="人数" type="number"
                     className="win-players"
                     InputProps={{ required: true, inputProps: { min: 0 } }}
                     value={rule.winPlayers}
                     onChange={evt => changeWinPlayers(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          失格
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" className="lose-point-active"
                    checked={rule.losePoint.active}
                    onChange={evt => changeLosePointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     className="lose-point-value"
                     disabled={!rule.losePoint.active}
                     InputProps={{ required: true }}
                     value={rule.losePoint.value}
                     onChange={evt => changeLosePointValue(evt.target.value)} />
          <FormGroup>
            <InputLabel id="lose-point-above">&nbsp;</InputLabel>
            <Select labelId="lose-point-above"
                    className="lose-point-above"
                    disabled={!rule.losePoint.active}
                    value={rule.losePoint.above}
                    onChange={evt => changeLosePointAbove(evt.target.value)}>
              <MenuItem value={true}>以上</MenuItem>
              <MenuItem value={false}>以下</MenuItem>
            </Select>
          </FormGroup>
          <Checkbox color="default" className="lose-batsu-active"
                    checked={rule.loseBatsu.active}
                    onChange={evt => changeLoseBatsuActive(evt.target.checked)} />
          <TextField label="バツ" type="number"
                     className="lose-batsu-value"
                     disabled={!rule.loseBatsu.active}
                     InputProps={{ required: true }}
                     value={rule.loseBatsu.value}
                     onChange={evt => changeLoseBatsuValue(evt.target.value)} />
          <FormGroup>
            <InputLabel id="lose-batsu-above">&nbsp;</InputLabel>
            <Select labelId="lose-batsu-above"
                    className="lose-batsu-above"
                    disabled={!rule.loseBatsu.active}
                    value={rule.loseBatsu.above}
                    onChange={evt => changeLoseBatsuAbove(evt.target.value)}>
              <MenuItem value={true}>以上</MenuItem>
              <MenuItem value={false}>以下</MenuItem>
            </Select>
          </FormGroup>
        </FormGroup>
      </FormGroup>
    </>
  )
}

export default NormalRule

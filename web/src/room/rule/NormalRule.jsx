import React from 'react'
import {
  Checkbox, FormControl, FormControlLabel, FormGroup,
  FormLabel, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import UpdownHelpButton from '../rule-help/UpdownHelpButton'
import WinPlayersHelpButton from '../rule-help/WinPlayersHelpButton'
import PassQuizHelpButton from '../rule-help/PassQuizHelpButton'

const NormalRule = ({ rule, changeRule }) => {
  const changeInitPoint = value => {
    changeRule(update(rule, { initPoint: { $set: parseNumber(value) } }))
  }

  const changeInitBatsu = value => {
    changeRule(update(rule, { initBatsu: { $set: parseNumber(value) } }))
  }

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

  const changeUpdown = value => {
    changeRule(update(rule, { updown: { $set: value } }))
  }

  const changeWinPointActive = value => {
    changeRule(update(rule, { winPoint: { active: { $set: value } } }))
  }

  const changeWinPointValue = value => {
    changeRule(update(rule, { winPoint: { value: { $set: parseNumber(value) } } }))
  }

  const changeWinPlayers = value => {
    changeRule(update(rule, { winPlayers: { $set: parseNumber(value) } }))
  }

  const changePassQuiz = value => {
    changeRule(update(rule, { passQuiz: { $set: value } }))
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
          初期値
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     InputProps={{ required: true }}
                     value={rule.initPoint}
                     onChange={evt => changeInitPoint(evt.target.value)} />
          <TextField label="バツ" type="number"
                     InputProps={{ required: true }}
                     value={rule.initBatsu}
                     onChange={evt => changeInitBatsu(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     InputProps={{ required: true }}
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
                     disabled={rule.updown}
                     InputProps={{ required: true }}
                     value={rule.pointWrong}
                     onChange={evt => changePointWrong(evt.target.value)} />
          <TextField label="バツ" type="number"
                     InputProps={{ required: true }}
                     value={rule.batsuWrong}
                     onChange={evt => changeBatsuWrong(evt.target.value)} />
          <TextField label="休み" type="number"
                     InputProps={{ required: true, inputProps: { min: 0 } }}
                     value={rule.lockWrong}
                     onChange={evt => changeLockWrong(evt.target.value)} />
          <FormControlLabel
            control={
              <Checkbox color="default"
                        checked={rule.updown}
                        onChange={evt => changeUpdown(evt.target.checked)} />
            }
            label={<>アップダウン<UpdownHelpButton /></>}
            classes={{ root: 'after-text' }} />
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
                     InputProps={{ required: true }}
                     value={rule.winPoint.value}
                     onChange={evt => changeWinPointValue(evt.target.value)} />
          <TextField label={<>人数<WinPlayersHelpButton disabled={!rule.winPoint.active} /></>}
                     type="number"
                     disabled={!rule.winPoint.active}
                     InputProps={{ required: true, inputProps: { min: 0 } }}
                     value={rule.winPlayers}
                     onChange={evt => changeWinPlayers(evt.target.value)} />
          <FormControlLabel
            control={
              <Checkbox color="default"
                        disabled={!rule.winPoint.active}
                        checked={rule.passQuiz}
                        onChange={evt => changePassQuiz(evt.target.checked)} />
            }
            label={<>通過クイズ<PassQuizHelpButton disabled={!rule.winPoint.active} /></>}
            classes={{ root: 'after-text' }} />
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
                     InputProps={{ required: true }}
                     value={rule.losePoint.value}
                     onChange={evt => changeLosePointValue(evt.target.value)} />
          <Checkbox color="default" checked={rule.loseBatsu.active}
                    onChange={evt => changeLoseBatsuActive(evt.target.checked)} />
          <TextField label="バツ" type="number"
                     disabled={!rule.loseBatsu.active}
                     InputProps={{ required: true }}
                     value={rule.loseBatsu.value}
                     onChange={evt => changeLoseBatsuValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
    </>
  )
}

export default NormalRule

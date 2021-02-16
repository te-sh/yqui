import React from 'react'
import {
  Checkbox, FormControl, FormControlLabel, FormGroup,
  FormLabel, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import ShareButtonHelp from '../rule-help/ShareButtonHelp'

const TeamRule = ({ rule, changeRule }) => {
  const changeActive = value => {
    changeRule(update(rule, { active: { $set: value } }))
  }

  const changeShareButton = value => {
    changeRule(update(rule, { shareButton: { $set: value } }))
  }

  const changePoint = value => {
    changeRule(update(rule, { point: { $set: value } }))
  }

  const changeBatsu = value => {
    changeRule(update(rule, { batsu: { $set: value } }))
  }

  const changeShareLock = value => {
    changeRule(update(rule, { shareLock: { $set: value } }))
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

  return (
    <>
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default" className="active-check"
                      checked={rule.active}
                      onChange={evt => changeActive(evt.target.checked)} />
          }
          label="チーム戦" />
      </FormGroup>
      <FormGroup className="rule-group" row={true}>
        <FormControlLabel
          control={
            <Checkbox color="default" className="share-button-check"
                      checked={rule.shareButton} disabled={!rule.active}
                      onChange={evt => changeShareButton(evt.target.checked)} />
          }
          label={<>ボタン共有<ShareButtonHelp disabled={!rule.active} /></>} />
        <FormControlLabel
          control={
            <Checkbox color="default" className="share-lock-check"
                      checked={rule.shareLock} disabled={!rule.active}
                      onChange={evt => changeShareLock(evt.target.checked)} />
          }
          label="休み共有" />
      </FormGroup>
      <FormGroup className="rule-group" row={true}>
        <FormControl>
          <InputLabel id="team-point-label">ポイント</InputLabel>
          <Select labelId="team-point-label" className="wide-select"
                  value={rule.point} disabled={!rule.active}
                  onChange={evt => changePoint(evt.target.value)}>
            <MenuItem value="sum">個人ポイントの和</MenuItem>
            <MenuItem value="mul">個人ポイントの積</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="team-batsu-label">バツ</InputLabel>
          <Select labelId="team-batsu-label" className="wide-select"
                  value={rule.batsu} disabled={!rule.active}
                  onChange={evt => changeBatsu(evt.target.value)}>
            <MenuItem value="sum">個人バツの和</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          勝ち抜け
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" className="win-point-active-check"
                    checked={rule.winPoint.active} disabled={!rule.active}
                    onChange={evt => changeWinPointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number" className="win-point"
                     disabled={!rule.active || !rule.winPoint.active}
                     InputProps={{ required: true }}
                     value={rule.winPoint.value}
                     onChange={evt => changeWinPointValue(evt.target.value)} />
          <FormGroup>
            <InputLabel id="win-point-above">&nbsp;</InputLabel>
            <Select labelId="win-point-above"
                    disabled={!rule.active || !rule.winPoint.active}
                    value={rule.winPoint.above}
                    onChange={evt => changeWinPointAbove(evt.target.value)}>
              <MenuItem value={true}>以上</MenuItem>
              <MenuItem value={false}>以下</MenuItem>
            </Select>
          </FormGroup>
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          失格
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" className="lose-point-active-check"
                    checked={rule.losePoint.active} disabled={!rule.active}
                    onChange={evt => changeLosePointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number" className="lose-point"
                     disabled={!rule.active || !rule.losePoint.active}
                     InputProps={{ required: true }}
                     value={rule.losePoint.value}
                     onChange={evt => changeLosePointValue(evt.target.value)} />
          <FormGroup>
            <InputLabel id="lose-point-above">&nbsp;</InputLabel>
            <Select labelId="lose-point-above"
                    disabled={!rule.active || !rule.losePoint.active}
                    value={rule.losePoint.above}
                    onChange={evt => changeLosePointAbove(evt.target.value)}>
              <MenuItem value={true}>以上</MenuItem>
              <MenuItem value={false}>以下</MenuItem>
            </Select>
          </FormGroup>
          <Checkbox color="default" className="lose-batsu-active-check"
                    checked={rule.loseBatsu.active} disabled={!rule.active}
                    onChange={evt => changeLoseBatsuActive(evt.target.checked)} />
          <TextField label="バツ" type="number" className="lose-batsu"
                     disabled={!rule.active || !rule.loseBatsu.active}
                     InputProps={{ required: true }}
                     value={rule.loseBatsu.value}
                     onChange={evt => changeLoseBatsuValue(evt.target.value)} />
          <FormGroup>
            <InputLabel id="lose-batsu-above">&nbsp;</InputLabel>
            <Select labelId="lose-batsu-above"
                    disabled={!rule.active || !rule.loseBatsu.active}
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

export default TeamRule

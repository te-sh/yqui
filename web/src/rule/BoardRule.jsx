import React from 'react'
import {
  Box, Checkbox, FormControl, FormControlLabel,
  FormGroup, FormLabel, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../util'

const BoardRule = ({ rule, changeRule }) => {
  const changeActive = value => {
    changeRule(update(rule, { active: { $set: value } }))
  }

  const changePointCorrect = value => {
    changeRule(update(rule, { pointCorrect: { $set: parseNumber(value) } }))
  }

  const changeApplyNormal = value => {
    changeRule(update(rule, { applyNormal: { $set: value } }))
  }

  return (
    <Box>
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.active}
                      onChange={evt => changeActive(evt.target.checked)} />
          }
          label="ボード回答" />
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     disabled={!rule.active}
                     value={rule.pointCorrect}
                     onChange={evt => changePointCorrect(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox color="default"
                        disabled={!rule.active}
                        checked={rule.applyNormal}
                        onChange={evt => changeApplyNormal(evt.target.checked)} />
            }
            label="1着に通常ルールを適用" />
        </FormControl>
      </FormGroup>
    </Box>
  )
}

export default BoardRule

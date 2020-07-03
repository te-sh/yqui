import React from 'react'
import {
  Checkbox, FormControl, FormControlLabel, FormGroup,
  FormLabel, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import TabPanel from './TabPanel'

const BoardRule = ({ tab, rule, changeRule }) => {
  const onChangeActive = (value) => {
    changeRule(update(rule, { active: { $set: value } }))
  }

  const onChangePointCorrect = (value) => {
    changeRule(update(rule, { pointCorrect: { $set: parse(value) } }))
  }

  const onChangeApplyNormal = (value) => {
    changeRule(update(rule, { applyNormal: { $set: value } }))
  }

  const parse = text => {
    const i = parseInt(text)
    return isNaN(i) ? 0 : i
  }

  return (
    <TabPanel value={tab} index={2} className="board-rule">
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.active}
                      onChange={evt => onChangeActive(evt.target.checked)} />
          }
          label="ボード" />
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     disabled={!rule.active}
                     value={rule.pointCorrect}
                     onChange={evt => onChangePointCorrect(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox color="default"
                        disabled={!rule.active}
                        checked={rule.applyNormal}
                        onChange={evt => onChangeApplyNormal(evt.target.checked)} />
            }
            label="1着に通常ルールを適用" />
        </FormControl>
      </FormGroup>
    </TabPanel>
  )
}

export default BoardRule

import React from 'react'
import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Popover, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import ConsBonusHelp from '../rule-help/ConsBonusHelp'
import SurvivalHelp from '../rule-help/SurvivalHelp'

const SpecialCorrectRule = ({ rule, changeRule }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeConsBonus = value => {
    changeRule(update(rule, { consBonus: { $set: value } }))
  }

  const changeSurvivalActive = value => {
    changeRule(update(rule, { survival: { active: { $set: value } } }))
  }

  const changeSurvivalValue = value => {
    changeRule(update(rule, { survival: { value: { $set: parseNumber(value) } } }))
  }

  const open = Boolean(anchorEl)

  const noSpecial = !rule.consBonus && !rule.survival.active

  return (
    <>
      <Button color="primary" size="small"
              variant={noSpecial ? 'outlined' : 'contained'}
              onClick={handleClick}>
        特殊
      </Button>
      <Popover open={open} anchorEl={anchorEl}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
               onClose={handleClose}>
        <Box className="special-rule">
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default"
                          checked={rule.consBonus}
                          onChange={evt => changeConsBonus(evt.target.checked)} />
              }
              label={<>連答ボーナス<ConsBonusHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group" row={true}>
            <FormControlLabel
              control={
                <Checkbox color="default"
                          checked={rule.survival.active}
                          onChange={evt => changeSurvivalActive(evt.target.checked)} />
              }
              label={<>サバイバル<SurvivalHelp /></>} />
            <TextField label="ポイント" type="number"
                       disabled={!rule.survival.active}
                       InputProps={{ required: true }}
                       value={rule.survival.value}
                       onChange={evt => changeSurvivalValue(evt.target.value)} />
          </FormGroup>
        </Box>
      </Popover>
    </>
  )
}

export default SpecialCorrectRule

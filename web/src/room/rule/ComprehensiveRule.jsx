import React from 'react'
import {
  Box, Button, Checkbox, FormControl, FormControlLabel,
  FormLabel, FormGroup, InputLabel, MenuItem, Popover,
  Select, Switch, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'

const ComprehensiveRule = ({ rule, changeRule }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const changeActive = value => {
    changeRule(update(rule, { active: { $set: value } }))
  }

  const changeCalc = value => {
    changeRule(update(rule, { calc: { $set: value } }))
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

  const noSpecial = !rule.active

  return (
    <>
      <Button color="primary" className="comprehensive-button"
              variant={noSpecial ? 'outlined' : 'contained'}
              onClick={handleClick}>
        総合ポイント
      </Button>
      <Popover open={open} anchorEl={anchorEl}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
               onClose={handleClose}>
        <Box className="rule special-rule">
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Switch color="primary"
                        checked={rule.active}
                        onChange={evt => changeActive(evt.target.checked)} />
              }
              label="表示する" />
          </FormGroup>
          <FormGroup className="rule-group">
            <FormControl>
              <InputLabel id="comprehensive-calc">計算方法</InputLabel>
              <Select labelId="comprehensive-calc" className="wide-select"
                      disabled={!rule.active}
                      value={rule.calc}
                      onChange={evt => changeCalc(evt.target.value)}>
                <MenuItem value="mul">ポイントとバツの積</MenuItem>
                <MenuItem value="sub">ポイントとバツの差</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup component="fieldset" className="rule-group">
            <FormLabel component="legend">
              勝ち抜け
            </FormLabel>
            <FormGroup row={true}>
              <Checkbox color="default" checked={rule.winPoint.active}
                        disabled={!rule.active}
                        onChange={evt => changeWinPointActive(evt.target.checked)} />
              <TextField label="ポイント" type="number"
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
        </Box>
      </Popover>
    </>
  )
}

export default ComprehensiveRule

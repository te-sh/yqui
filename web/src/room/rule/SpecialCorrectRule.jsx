import React from 'react'
import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Popover, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import ConsBonusHelp from '../rule-help/ConsBonusHelp'
import PassQuizHelp from '../rule-help/PassQuizHelp'
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

  const changePassQuiz = value => {
    changeRule(update(rule, { passQuiz: { $set: value } }))
  }

  const changeSurvivalActive = value => {
    changeRule(update(rule, { survival: { active: { $set: value } } }))
  }

  const changeSurvivalValue = value => {
    changeRule(update(rule, { survival: { value: { $set: parseNumber(value) } } }))
  }

  const open = Boolean(anchorEl)

  const noSpecial = !rule.consBonus && !rule.passQuiz && !rule.survival.active

  return (
    <>
      <Button color="primary" className="special-correct-button"
              variant={noSpecial ? 'outlined' : 'contained'}
              onClick={handleClick}>
        特殊
      </Button>
      <Popover open={open} anchorEl={anchorEl}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
               onClose={handleClose}>
        <Box className="special-rule special-correct">
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="cons-bonus"
                          checked={rule.consBonus}
                          onChange={evt => changeConsBonus(evt.target.checked)} />
              }
              label={<>連答ボーナス<ConsBonusHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="pass-quiz"
                          checked={rule.passQuiz}
                          onChange={evt => changePassQuiz(evt.target.checked)} />
              }
              label={<>通過クイズ<PassQuizHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group" row={true}>
            <FormControlLabel
              control={
                <Checkbox color="default" className="survival-active"
                          checked={rule.survival.active}
                          onChange={evt => changeSurvivalActive(evt.target.checked)} />
              }
              label={<>サバイバル<SurvivalHelp /></>} />
            <TextField label="ポイント" type="number"
                       className="survival-value"
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

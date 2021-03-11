import React from 'react'
import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Popover
} from '@material-ui/core'
import update from 'immutability-helper'
import UpdownHelp from '../rule-help/UpdownHelp'
import SwedishHelp from '../rule-help/SwedishHelp'
import BackstreamHelp from '../rule-help/BackstreamHelp'
import DivideHelp from '../rule-help/DivideHelp'
import BelowLockHelp from '../rule-help/BelowLockHelp'

const SpecialWrongRule = ({ rule, changeRule }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeUpdown = value => {
    changeRule(update(rule, { updown: { $set: value } }))
  }

  const changeSwedish = value => {
    changeRule(update(rule, { swedish: { $set: value } }))
  }

  const changeBackstream = value => {
    changeRule(update(rule, { backstream: { $set: value } }))
  }

  const changeDivide = value => {
    changeRule(update(rule, { divide: { $set: value } }))
  }

  const changeBelowLock = value => {
    changeRule(update(rule, { belowLock: { $set: value } }))
  }

  const open = Boolean(anchorEl)

  const noSpecial = !rule.updown && !rule.swedish && !rule.backstream &&
                    !rule.divide && !rule.belowLock

  return (
    <>
      <Button color="primary" className="special-wrong-button"
              variant={noSpecial ? 'outlined' : 'contained'}
              onClick={handleClick}>
        特殊
      </Button>
      <Popover open={open} anchorEl={anchorEl}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
               onClose={handleClose}>
        <Box className="special-rule special-wrong">
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="updown"
                          checked={rule.updown}
                          onChange={evt => changeUpdown(evt.target.checked)} />
              }
              label={<>アップダウン<UpdownHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="swedish"
                          checked={rule.swedish}
                          onChange={evt => changeSwedish(evt.target.checked)} />
              }
              label={<>Swedish<SwedishHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="backstream"
                          checked={rule.backstream}
                          onChange={evt => changeBackstream(evt.target.checked)} />
              }
              label={<>Backstream<BackstreamHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="divide"
                          checked={rule.divide}
                          onChange={evt => changeDivide(evt.target.checked)} />
              }
              label={<>Divide<DivideHelp /></>} />
          </FormGroup>
          <FormGroup className="rule-group">
            <FormControlLabel
              control={
                <Checkbox color="default" className="below-lock"
                          checked={rule.belowLock}
                          onChange={evt => changeBelowLock(evt.target.checked)} />
              }
              label={<>BelowLock<BelowLockHelp /></>} />
          </FormGroup>
        </Box>
      </Popover>
    </>
  )
}

export default SpecialWrongRule

import React from 'react'
import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Popover
} from '@material-ui/core'
import update from 'immutability-helper'
import UpdownHelp from '../rule-help/UpdownHelp'
import SwedishHelp from '../rule-help/SwedishHelp'

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

  const open = Boolean(anchorEl)

  const noSpecial = !rule.updown || !rule.swedish

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
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox color="default"
                          checked={rule.updown}
                          onChange={evt => changeUpdown(evt.target.checked)} />
              }
              label={<>アップダウン<UpdownHelp /></>}
              classes={{ root: 'after-text' }} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox color="default"
                          checked={rule.swedish}
                          onChange={evt => changeSwedish(evt.target.checked)} />
              }
              label={<>Swedish<SwedishHelp /></>}
              classes={{ root: 'after-text' }} />
          </FormGroup>
        </Box>
      </Popover>
    </>
  )
}

export default SpecialWrongRule

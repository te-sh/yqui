import React from 'react'
import {
  Box, Button, Checkbox, FormControlLabel, Popover
} from '@material-ui/core'
import update from 'immutability-helper'
import UpdownHelpButton from '../rule-help/UpdownHelpButton'

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

  const open = Boolean(anchorEl)

  const noSpecial = !rule.updown

  return (
    <>
      <Button color="primary" size="small"
              variant={noSpecial ? 'outlined' : 'contained'}
              onClick={handleClick}>
        特殊
      </Button>
      <Popover open={open} anchorEl={anchorEl}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
               onClose={handleClose}>
        <Box className="special-rule">
          <FormControlLabel
            control={
              <Checkbox color="default"
                        checked={rule.updown}
                        onChange={evt => changeUpdown(evt.target.checked)} />
            }
            label={<>アップダウン<UpdownHelpButton /></>}
            classes={{ root: 'after-text' }} />
        </Box>
      </Popover>
    </>
  )
}

export default SpecialWrongRule

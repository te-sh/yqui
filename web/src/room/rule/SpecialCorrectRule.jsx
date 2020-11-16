import React from 'react'
import {
  Box, Button, Checkbox, FormControlLabel, FormGroup, Popover
} from '@material-ui/core'
import update from 'immutability-helper'

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

  const open = Boolean(anchorEl)

  const noSpecial = !rule.consBonus

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
                          checked={rule.consBonus}
                          onChange={evt => changeConsBonus(evt.target.checked)} />
              }
              label="連答ボーナス" />
          </FormGroup>
        </Box>
      </Popover>
    </>
  )
}

export default SpecialCorrectRule

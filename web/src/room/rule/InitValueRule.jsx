import React from 'react'
import { Box, Button, FormGroup, Popover, TextField } from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'

const InitValueRule = ({ rule, changeRule }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const changeInitPoint = value => {
    changeRule(update(rule, { initPoint: { $set: parseNumber(value) } }))
  }

  const changeInitBatsu = value => {
    changeRule(update(rule, { initBatsu: { $set: parseNumber(value) } }))
  }

  const noSpecial = rule.initPoint === 0 && rule.initBatsu === 0

  return (
    <>
      <Button color="primary" className="init-value-button"
              variant={noSpecial ? 'outlined' : 'contained'}
              onClick={handleClick}>
        初期値
      </Button>
      <Popover open={open} anchorEl={anchorEl}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
               onClose={handleClose}>
        <Box className="special-rule init-value">
          <FormGroup row={true} className="rule-group">
            <TextField label="ポイント" type="number"
                       className="point"
                       InputProps={{ required: true }}
                       value={rule.initPoint}
                       onChange={evt => changeInitPoint(evt.target.value)} />
            <TextField label="バツ" type="number"
                       className="batsu"
                       InputProps={{ required: true }}
                       value={rule.initBatsu}
                       onChange={evt => changeInitBatsu(evt.target.value)} />
          </FormGroup>
        </Box>
      </Popover>
    </>
  )
}

export default InitValueRule

import React from 'react'
import { Box, Button } from '@material-ui/core'
import classNames from 'classnames'
import { endAssign, cancelAssign } from '../../lib/assign'
import './Actions.scss'

const Assign = ({ className, hidden }) => (
  <Box className={classNames(className, 'assign-actions', { hidden })}>
    <Button variant="outlined" color="primary" size="large"
            className="end-assign-button"
            onClick={endAssign}>
      設定
    </Button>
    <Button variant="outlined" color="secondary" size="large"
            className="cancel-assign-button"
            onClick={cancelAssign}>
      閉じる
    </Button>
  </Box>
)

export default Assign

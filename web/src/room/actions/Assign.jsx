import React from 'react'
import { Box, Button, Paper } from '@material-ui/core'
import { endAssign, cancelAssign } from '../../lib/assign'
import './Actions.scss'

const Assign = ({ className }) => {
  return (
    <Paper className={className}>
      <Box className="actions-content assign-actions">
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
    </Paper>
  )
}

export default Assign

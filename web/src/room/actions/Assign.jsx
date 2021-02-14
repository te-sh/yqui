import React from 'react'
import { Box, Button, Paper } from '@material-ui/core'
import { endAssign, cancelAssign } from '../../lib/assign'
import './Actions.scss'

const Assign = ({ className }) => {
  return (
    <Paper className={className}>
      <Box className="actions-content assign-actions">
        <Button variant="outlined" color="primary" size="large"
                onClick={endAssign}>
          設定
        </Button>
        <Button variant="outlined" color="secondary" size="large"
                onClick={cancelAssign}>
          閉じる
        </Button>
      </Box>
    </Paper>
  )
}

export default Assign

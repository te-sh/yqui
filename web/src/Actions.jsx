import React from 'react'
import { Button, Paper } from '@material-ui/core'

const Actions = props => {
  return (
    <Paper className="actions">
      <Button variant="outlined" color="primary" size="large">
        早押し
      </Button>
    </Paper>
  )
}

export default Actions

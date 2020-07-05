import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Topbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar

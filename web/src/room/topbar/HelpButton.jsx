import React from 'react'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import Help from '../dialogs/Help'

const HelpButton = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const open = () => {
    setDialogOpen(true)
  }

  const close = () => {
    setDialogOpen(false)
  }

  return (
    <Box>
      <Tooltip title="ヘルプ">
        <span>
          <IconButton color="inherit" onClick={open}>
            <HelpOutline />
          </IconButton>
        </span>
      </Tooltip>
      <Help open={dialogOpen} close={close} />
    </Box>
  )
}

export default HelpButton

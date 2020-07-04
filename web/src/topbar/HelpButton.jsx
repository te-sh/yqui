import React from 'react'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import Help from '../dialogs/Help'

const HelpButton = () => {
  const [helpOpen, setHelpOpen] = React.useState(false)

  return (
    <Box>
      <Tooltip title="ヘルプ">
        <IconButton color="inherit"
                    onClick={() => setHelpOpen(true)}>
          <HelpOutline />
        </IconButton>
      </Tooltip>
      <Help open={helpOpen} close={() => setHelpOpen(false)} />
    </Box>
  )
}

export default HelpButton

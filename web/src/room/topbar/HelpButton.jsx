import React from 'react'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { setOpenHelp } from '../../actions'

const HelpButton = () => {
  const openDialog = () => {
    setOpenHelp(true)
  }

  return (
    <Box>
      <Tooltip title="ヘルプ">
        <span>
          <IconButton color="inherit"
                      onClick={openDialog}>
            <HelpOutline />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default HelpButton

import React from 'react'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { setOpenSetting } from '../../redux/actions'
import './TopBar.scss'

const SettingButton = () => {
  const open = () => {
    setOpenSetting(true)
  }

  return (
    <Box>
      <Tooltip title="設定">
        <span>
          <IconButton color="inherit" onClick={open}>
            <Settings />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default SettingButton

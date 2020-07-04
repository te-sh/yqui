import React from 'react'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import Setting from '../dialogs/Setting'
import './TopBar.scss'

const SettingButton = () => {
  const [settingOpen, setSettingOpen] = React.useState(false)

  return (
    <Box>
      <Tooltip title="設定">
        <span>
          <IconButton color="inherit"
                      onClick={() => setSettingOpen(true)}>
            <Settings />
          </IconButton>
        </span>
      </Tooltip>
      <Setting open={settingOpen} close={() => setSettingOpen(false)} />
    </Box>
  )
}

export default SettingButton

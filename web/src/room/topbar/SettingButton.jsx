import React from 'react'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { sendWs, SEND_USER } from '../../lib/send'
import Setting from '../dialogs/Setting'
import './TopBar.scss'

const SettingButton = ({ user }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const setting = {
    chatAnswer: user.chatAnswer,
    volume: parseInt(localStorage.getItem('volume') || '100')
  }

  const open = () => {
    setDialogOpen(true)
  }

  const ok = setting => {
    sendWs(SEND_USER, update(user, { chatAnswer: { $set: setting.chatAnswer } }))
    localStorage.setItem('volume', setting.volume)
    setDialogOpen(false)
  }

  const cancel = () => {
    setDialogOpen(false)
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
      <Setting open={dialogOpen} setting={setting}
               ok={ok} cancel={cancel} />
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user
  })
)(SettingButton)

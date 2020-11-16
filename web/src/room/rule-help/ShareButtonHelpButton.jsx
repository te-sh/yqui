import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { Help } from '@material-ui/icons'

const ShareButtonHelpButton = ({ disabled }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        同じチームの他の人がボタンを押しているときはボタンを押すことができません.
      </Typography>
    </>
  )

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton size="small" edge="start" disabled={disabled}>
          <Help />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default ShareButtonHelpButton

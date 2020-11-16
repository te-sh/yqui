import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const ShareButtonHelp = ({ size, disabled }) => {
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
        <HelpButton size={size} disabled={disabled} />
      </span>
    </Tooltip>
  )
}

export default ShareButtonHelp

import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { Help } from '@material-ui/icons'

const WinPlayersHelpButton = ({ disabled }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        この値はルール表示にだけ使用されます. それ以外の処理は行われません.
      </Typography>
      <Typography variant="body2">
        この値を 0 以下にするとルール表示で表示されません.
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

export default WinPlayersHelpButton

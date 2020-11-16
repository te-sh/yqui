import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const WinPlayersHelp = ({ size, disabled }) => {
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
        <HelpButton size={size} disabled={disabled} />
      </span>
    </Tooltip>
  )
}

export default WinPlayersHelp

import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from '../HelpButton'

const PointHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        ポイントが多い方が上位となります.
      </Typography>
      <Typography variant="body2">
        ポイントが同じなら同位です.
      </Typography>
    </>
  )

  return (
    <Tooltip title={tooltip}>
      <span>
        <HelpButton size={size} />
      </span>
    </Tooltip>
  )
}

export default PointHelp

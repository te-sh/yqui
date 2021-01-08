import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const BackstreamHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        誤答したときにポイントが誤答罰適用後のバツを引いた値になります.
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

export default BackstreamHelp

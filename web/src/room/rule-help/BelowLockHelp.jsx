import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const BelowLockHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        誤答したときにポイントが初期値を下回った場合, その下回った数だけ休みがつきます.
      </Typography>
      <Typography variant="body2">
        その場合のポイントは初期値になります.
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

export default BelowLockHelp

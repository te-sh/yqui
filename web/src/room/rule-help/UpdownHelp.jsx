import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const UpdownHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        誤答したときにポイントが初期値になります.
      </Typography>
      <Typography variant="body2">
        ポイント以外の誤答罰も適用されます.
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

export default UpdownHelp

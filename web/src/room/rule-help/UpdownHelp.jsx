import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { Help } from '@material-ui/icons'

const UpdownHelp = () => {
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
      <IconButton size="small" edge="start">
        <Help />
      </IconButton>
    </Tooltip>
  )
}

export default UpdownHelp

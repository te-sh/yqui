import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { Help } from '@material-ui/icons'

const SwedishHelpButton = () => {
  const tooltip = (
    <>
      <Typography variant="body2">
        誤答したときに与えられるバツの数がそのときのポイントに依存します.
      </Typography>
      <Typography variant="body2">
        0ポイントのときは1バツ, 1か2ポイントのときは2バツ, 3か4か5ポイントのときは3バツ…となります.
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

export default SwedishHelpButton

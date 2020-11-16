import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const SwedishHelp = ({ size }) => {
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
      <span>
        <HelpButton size={size} />
      </span>
    </Tooltip>
  )
}

export default SwedishHelp

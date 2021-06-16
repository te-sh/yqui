import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from '../HelpButton'

const PointAndBatsuHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        ポイントが多い方が上位となります.
      </Typography>
      <Typography variant="body2">
        ポイントが同じならバツが少ない方が上位となります.
      </Typography>
      <Typography variant="body2">
        ポイントもバツも同じなら同位となります.
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

export default PointAndBatsuHelp

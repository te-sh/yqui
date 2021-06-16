import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from '../HelpButton'

const CompPointAndPointHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        総合ポイントが多い方が上位となります.
      </Typography>
      <Typography variant="body2">
        総合ポイントが同じならポイントが多い方が上位となります.
      </Typography>
      <Typography variant="body2">
        総合ポイントもポイントも同じなら同位となります.
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

export default CompPointAndPointHelp

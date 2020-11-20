import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const SurvivalHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        正解したときに他の人全員に指定のポイントを与えます.
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

export default SurvivalHelp

import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const SurvivalHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        正解ポイントが 0 のときは, 他の人全員に指定のポイントを与えます.
      </Typography>
      <Typography variant="body2">
        正解ポイントが 0 以外のときは, 正解時のポイントが初期値未満であれば正解者に正解ポイントを与えます.
        正解時のポイントが初期値以上であれば他の人全員に指定のポイントを与えます.
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

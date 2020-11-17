import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const DivideHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        誤答したときにポイントが誤答罰適用後のバツで割った値になります.
        小数点以下は切り捨てです.
      </Typography>
      <Typography variant="body2">
        誤答罰適用後のバツが 0 の場合は何もしません.
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

export default DivideHelp

import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const ConsBonusHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        N 回連続正解すると与えられるポイントが N 倍になります.
      </Typography>
      <Typography variant="body2">
        誤答した場合もしくは他の人が正解した場合に連続が途切れます.
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

export default ConsBonusHelp

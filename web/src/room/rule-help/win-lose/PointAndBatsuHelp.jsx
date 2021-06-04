import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from '../HelpButton'

const PointAndBatsuHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        最上位勝抜はポイントの最上位者の中でバツの最下位者が勝抜となります.
      </Typography>
      <Typography variant="body2">
        最下位失格はポイントの最下位者の中でバツの最上位者が失格となります.
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

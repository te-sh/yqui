import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from '../HelpButton'

const CompPointAndPointHelp = ({ size }) => {
  const tooltip = (
    <>
      <Typography variant="body2">
        最上位勝抜は総合ポイントの最上位者の中でポイントの最上位者が勝抜となります.
      </Typography>
      <Typography variant="body2">
        最下位失格は総合ポイントの最下位者の中でポイントの最下位者が失格となります.
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

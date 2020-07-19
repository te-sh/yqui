import React from 'react'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { ordial } from '../../util'
import './PlayerStatus.scss'

const PlayerStatus = ({ className, score }) => {
  const statusClass = {
    'win': score.win > 0,
    'lose': score.lose > 0,
    'lock': score.lock > 0
  }

  const statusText = (() => {
    if (score.win > 0) {
      return ordial(score.win)
    } else if (score.lose > 0) {
      return 'Lose'
    } else if (score.lock > 0) {
      return `Lock ${score.lock}`
    } else {
      return ''
    }
  })()

  return (
    <Box className={classNames(className, statusClass)}>
      <Typography className="player-status-content">
        {statusText}
      </Typography>
    </Box>
  )
}

export default PlayerStatus

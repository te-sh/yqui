import React from 'react'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import Timer from './Timer'

const Player = ({ className, hidden }) => {
  return (
    <Box className={classNames(className, 'player-subactions', { hidden })}>
      <Timer className="group" />
    </Box>
  )
}

export default Player

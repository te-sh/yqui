import React from 'react'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import './Actions.scss'

const Observer = ({ className, hidden }) => (
  <Box className={classNames(className, 'observer-actions', { hidden })}>
    <Typography variant="h6">
      あなたは観戦者です
    </Typography>
  </Box>
)

export default Observer

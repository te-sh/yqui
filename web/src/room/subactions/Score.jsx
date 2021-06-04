import React from 'react'
import { Box } from '@material-ui/core'
import classNames from 'classnames'

const Score = ({ className, hidden }) => (
  <Box className={classNames(className, 'score-subactions', { hidden })}>
  </Box>
)

export default Score

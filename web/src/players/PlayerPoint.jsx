import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Typography } from '@material-ui/core'
import './PlayerPoint.scss'

const PlayerPoint = ({ className, score, isMaster, rule }) => {
  const pointText = isMaster || rule.showPoint ? score.point : '-'
  const batsuText = isMaster || rule.showPoint ? score.batsu : '-'

  return (
    <Box className={classNames('player-point', className)}>
      <Box className="correct">
        <Typography className="content">
          {pointText}
        </Typography>
      </Box>
      <Box className="wrong">
        <Typography className="content">
          {batsuText}
        </Typography>
      </Box>
    </Box>
  )
}

export default connect(
  state => ({
    isMaster: state.isMaster,
    rule: state.rule
  })
)(PlayerPoint)

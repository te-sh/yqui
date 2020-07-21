import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Typography } from '@material-ui/core'
import './PlayerPoint.scss'

const PlayerPoint = ({ className, user, score, rule }) => {
  const pointText = user.isMaster || rule.showPoint ? score.point : '-'
  const batsuText = user.isMaster || rule.showPoint ? score.batsu : '-'

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
    user: state.user,
    rule: state.rule
  })
)(PlayerPoint)

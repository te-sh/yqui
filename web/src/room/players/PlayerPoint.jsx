import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Typography } from '@material-ui/core'
import './PlayerPoint.scss'

const PlayerPoint = ({ className, user, score, rule }) => {
  const comp = rule.player.comprehensive.active

  const pointText = user.isMaster || rule.showPoint ? score.point : '-'
  const batsuText = user.isMaster || rule.showPoint ? score.batsu : '-'
  const compPointText = user.isMaster || rule.showPoint ? score.compPoint : '-'

  const point = (
    <Box className="point">
      <Typography className="content">
        {pointText}
      </Typography>
    </Box>
  )

  const batsu = (
    <Box className="batsu">
      <Typography className="content">
        {batsuText}
      </Typography>
    </Box>
  )

  const compPoint = (
    <Box className="comp-point">
      <Typography className="content">
        {compPointText}
      </Typography>
    </Box>
  )

  return (
    <Box className={classNames('player-point', comp && 'comp', className)}>
      {point}
      {comp && compPoint}
      {batsu}
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    rule: state.rule
  })
)(PlayerPoint)

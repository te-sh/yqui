import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Typography } from '@material-ui/core'
import './PlayerPoint.scss'

const PlayerPoint = ({ className, user, score, rule }) => {
  const comp = rule.player.comprehensive.active

  const text = {
    point: user.isMaster || rule.showPoint ? score.point : '-',
    batsu: user.isMaster || rule.showPoint ? score.batsu : '-',
    compPoint: user.isMaster || rule.showPoint ? score.compPoint : '-'
  }

  const point = (
    <Box className="point">
      <Typography className="content">
        {text.point}
      </Typography>
    </Box>
  )

  const batsu = (
    <Box className="batsu">
      <Typography className="content">
        {text.batsu}
      </Typography>
    </Box>
  )

  const compPoint = (
    <Box className="comp-point">
      <Typography className="content">
        {text.compPoint}
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

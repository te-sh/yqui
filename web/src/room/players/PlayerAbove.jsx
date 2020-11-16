import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { readableTime } from '../../lib/util'
import './PlayerAbove.scss'

const PlayerAbove = ({ order, delay, score, rule }) => {
  const pushOrderClass = classNames('push-order', {
    'pushed': order >= 0
  })

  const pushOrderContentClass = classNames('push-order-content', {
    'has-right': order < rule.rightNum
  })

  const extComponent = (
    <Box className="cons">
      <Typography>
        {rule.player.specialCorrect.consBonus && score.cons > 0 && <>+{score.cons}</>}
        {rule.other.passQuiz && score.passSeat && <>通過席</>}
      </Typography>
    </Box>
  )

  return (
    <Box className="player-above">
      <Paper className={pushOrderClass}>
        <Typography align="center"
                    className={pushOrderContentClass}>
          {order >= 0 && order + 1}
        </Typography>
      </Paper>
      <Box className="push-speed">
        <Typography variant="caption">
          {delay >= 0 && readableTime(delay)}
        </Typography>
      </Box>
      {extComponent}
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule
  })
)(PlayerAbove)

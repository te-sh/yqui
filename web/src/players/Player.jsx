import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import PlayerAbove from './PlayerAbove'
import PlayerName from './PlayerName'
import PlayerStatus from './PlayerStatus'
import './Player.scss'

const Player = ({ player, isMaster, scores, buttons, rule }) => {
  const order = buttons.pushers.indexOf(player)
  const right = order === buttons.answerers.length ? player : -1
  const score = scores[player] || {}

  const playerClass = classNames(
    'player',
    { 'right': right >= 0 }
  )

  const pointText = isMaster || rule.showPoint ? score.point : '-'
  const batsuText = isMaster || rule.showPoint ? score.batsu : '-'

  return (
    <Box className="player-container">
      <PlayerAbove order={order} score={score} />
      <Paper className={playerClass}>
        <PlayerName className="player-name"
                    player={player} right={right} />
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
        <PlayerStatus score={score} className="player-status" />
      </Paper>
    </Box>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    isMaster: state.isMaster,
    scores: state.scores,
    buttons: state.buttons,
    rule: state.rule
  })
)(Player)

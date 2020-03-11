import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { ordial } from '../util'
import PlayerName from './PlayerName'
import './Player.scss'

const Player = ({ teamGame, player, team, isMaster, scores, buttons, rule }) => {
  const [order, right] = (() => {
    if (teamGame) {
      let orders = team.map(id => buttons.pushers.indexOf(id))
      let i = orders.findIndex(order => order >= 0)
      if (i < 0) {
        return [-1, -1]
      } else {
        let order = orders[i]
        let right = order === buttons.answerers.length ? team[i] : -1
        return [order, right]
      }
    } else {
      let order = buttons.pushers.indexOf(player)
      let right = order === buttons.answerers.length ? player : -1
      return [order, right]
    }
  })()

  const score = (teamGame ? scores[team[0]] : scores[player]) || {}

  const answerOrderClass = classNames(
    'answer-order',
    { 'pushed': order >= 0 }
  )

  const playerClass = classNames(
    'player',
    { 'right': right >= 0 }
  )

  const orderClass = classNames(
    'content',
    { 'has-right': order < rule.rightNum }
  )

  const pointText = isMaster || rule.showPoint ? score.point : '-'

  const batsuText = isMaster || rule.showPoint ? score.batsu : '-'

  const statusClass = classNames(
    'player-status',
    {
      'win': score.win > 0,
      'lose': score.lose > 0,
      'lock': score.lock > 0
    }
  )

  const statusText = (() => {
    if (score.win > 0) {
      return ordial(score.win)
    } else if (score.lose > 0) {
      return 'Lose'
    } else if (score.lock > 0) {
      return 'Lock ' + score.lock
    } else {
      return ''
    }
  })()

  return (
    <Box className="player-container">
      <Paper className={answerOrderClass}>
        <Typography align="center" className={orderClass}>
          {order >= 0 ? order + 1 : ""}
        </Typography>
      </Paper>
      <Paper className={playerClass}>
        <PlayerName className="player-name"
                    teamGame={teamGame} player={player} team={team} right={right} />
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
        <Box className={statusClass}>
          <Typography className="content">
            {statusText}
          </Typography>
        </Box>
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

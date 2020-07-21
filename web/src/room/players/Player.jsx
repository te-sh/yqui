import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import classNames from 'classnames'
import PlayerAbove from './PlayerAbove'
import PlayerName from './PlayerName'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import Board from './Board'
import './Player.scss'

const Player = ({ player, boards, sg, buttons, rule }) => {
  const order = buttons.pushers.indexOf(player)
  const right = order === buttons.answerers.length ? player : -1
  const board = boards[player] || {}
  const score = sg.player.scores.get(player)

  const playerClass = classNames(
    'player',
    { 'right': right >= 0 }
  )

  return (
    <Box className="player-container">
      <PlayerAbove order={order} score={score} />
      <Paper className={playerClass}>
        <PlayerName className="player-name"
                    player={player} right={right} />
        <PlayerPoint score={score} className="player-point" />
        <PlayerStatus score={score} className="player-status" />
        { rule.board.active ? <Board className="board" board={board} /> : null }
      </Paper>
    </Box>
  )
}

export default connect(
  state => ({
    boards: state.boards,
    sg: state.sg,
    buttons: state.buttons,
    rule: state.rule
  })
)(Player)

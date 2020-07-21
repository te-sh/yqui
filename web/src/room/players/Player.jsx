import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import classNames from 'classnames'
import { pushOrder } from '../../lib/buttons'
import PlayerAbove from './PlayerAbove'
import PlayerName from './PlayerName'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import Board from './Board'
import './Player.scss'

const Player = ({ player, boards, sg, buttons, rule }) => {
  const [order, delay, myTurn] = pushOrder(buttons, player)
  const board = boards[player] || {}
  const score = sg.player.scores.get(player)

  const playerClass = classNames('player', { 'my-turn': myTurn })

  return (
    <Box className="player-container">
      <PlayerAbove order={order} delay={delay} score={score} />
      <Paper className={playerClass}>
        <PlayerName className="player-name" player={player} myTurn={myTurn} />
        <PlayerPoint className="player-point" score={score} />
        <PlayerStatus className="player-status" score={score} />
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

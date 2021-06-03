import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import classNames from 'classnames'
import { pushOrder } from '../../lib/buttons'
import { initBoard } from '../../lib/board'
import { initScore } from '../../lib/score'
import PlayerAbove from './PlayerAbove'
import PlayerName from './PlayerName'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import Board from './Board'
import './PlayerContainer.scss'

const PlayerContainer = ({ player, board: { bg }, sg, buttons, rule }) => {
  const [order, delay, myTurn] = pushOrder(buttons, player)
  const board = bg.boards.get(player) || initBoard
  const score = sg.player.scores.get(player) || initScore

  const boxClass = classNames('player-box', { 'my-turn': myTurn })

  return (
    <Box className="player-container">
      <PlayerAbove order={order} delay={delay} score={score} />
      <Paper className={boxClass}>
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
    board: state.board,
    sg: state.sg,
    buttons: state.buttons,
    rule: state.rule
  })
)(PlayerContainer)

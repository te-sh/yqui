import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import classNames from 'classnames'
import { pushOrder } from '../../lib/buttons'
import { initialScore } from '../../redux/score_reducer'
import { initialBoard } from '../../redux/board_reducer'
import PlayerAbove from './PlayerAbove'
import PlayerName from './PlayerName'
import PlayerPoint from './PlayerPoint'
import EditPoint from './EditPoint'
import PlayerStatus from './PlayerStatus'
import Board from './Board'
import './PlayerContainer.scss'

const PlayerContainer = ({ player, score: { sg, edit }, board: { bg }, buttons, rule }) => {
  const [order, delay, myTurn] = pushOrder(buttons, player)
  const score = sg.player.scores.get(player) || initialScore
  const board = bg.boards.get(player) || initialBoard

  const boxClass = classNames('player-box', { 'my-turn': myTurn })

  const mainComponent = () => {
    if (edit) {
      return <EditPoint className="edit-point" player={player} />
    } else {
      return (
        <>
          <PlayerPoint className="player-point" score={score} />
          <PlayerStatus className="player-status" score={score} />
          { rule.board.active ? <Board className="board" board={board} /> : null }
        </>
      )
    }
  }

  return (
    <Box className="player-container">
      <PlayerAbove order={order} delay={delay} score={score} />
      <Paper className={boxClass}>
        <PlayerName className="player-name" player={player} myTurn={myTurn} />
        {mainComponent()}
      </Paper>
    </Box>
  )
}

export default connect(
  state => ({
    board: state.board,
    score: state.score,
    buttons: state.buttons,
    rule: state.rule
  })
)(PlayerContainer)

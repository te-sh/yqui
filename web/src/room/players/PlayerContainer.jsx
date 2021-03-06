import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import classNames from 'classnames'
import { initialScore } from '../../redux/score_reducer'
import { initialBoard } from '../../redux/board_reducer'
import { initialButtonUser } from '../../redux/button_reducer'
import PlayerAbove from './PlayerAbove'
import PlayerName from './PlayerName'
import PlayerPoint from './PlayerPoint'
import EditPoint from './EditPoint'
import PlayerStatus from './PlayerStatus'
import PlayerBelow from './PlayerBelow'
import Board from './Board'
import './PlayerContainer.scss'

const PlayerContainer = ({ player, score: { sg, edit }, board: { bg }, button, rule }) => {
  const { order, delay, myTurn } = button.user.get(player) || initialButtonUser
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
          {rule.board.active ? <Board className="board" board={board} /> : null}
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
      {!edit && <PlayerBelow rule={rule} score={score} />}
    </Box>
  )
}

export default connect(
  state => ({
    board: state.board,
    score: state.score,
    button: state.button,
    rule: state.rule
  })
)(PlayerContainer)

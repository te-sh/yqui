import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import classNames from 'classnames'
import update from 'immutability-helper'
import { recvBoard } from '../redux/actions'
import { send } from '../communicate'
import './Board.scss'

const Board = ({ className, ws, isMaster, board, updateBoard }) => {
  const [correct, setCorrect] = React.useState(false)

  React.useEffect(
    () => {
      setCorrect(board.correct)
    },
    [board]
  )

  const changeCorrect = (evt, newCorrect) => {
    const newBoard = update(board, {
      correct: { $set: newCorrect },
    })
    if (board.open) {
      send.board(ws, newBoard)
    } else {
      updateBoard(newBoard)
    }
  }

  const buttons = (
    <Box className="board-buttons">
      <ToggleButtonGroup size="small" exclusive
                         value={correct} onChange={changeCorrect}>
        <ToggleButton value={true} aria-label="correct">
          <RadioButtonUnchecked />
        </ToggleButton>
        <ToggleButton value={false} aria-label="wrong">
          <Close />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )

  const boxClass = classNames(
    'board-text',
    { 'correct': board.correct, 'open': board.open }
  )

  return (
    <Box className={className}>
      <Box className={boxClass}>
        { board.text }
      </Box>
      { isMaster ? buttons : null }
    </Box>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    isMaster: state.isMaster
  }),
  dispatch => ({
    updateBoard: board => dispatch(recvBoard(board))
  })
)(Board)

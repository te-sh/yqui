import React from 'react'
import { connect } from 'react-redux'
import { Box, Tooltip } from '@material-ui/core'
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

  const open = () => {
    if (board.open) {
      return
    }
    const newBoard = update(board, {
      open: { $set: true }
    })
    send.board(ws, newBoard)
  }

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

  const boxClass = classNames(
    'board-text',
    { 'correct': board.correct, 'open': board.open, 'master': isMaster }
  )

  const box = isMaster && !board.open ? (
    <Tooltip title="クリックでオープン">
      <Box className={boxClass} onClick={open}>
        { board.text }
      </Box>
    </Tooltip>
  ) : (
    <Box className={boxClass}>
      { board.text }
    </Box>
  )

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

  return (
    <Box className={className}>
      { box }
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

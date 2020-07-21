import React from 'react'
import { connect } from 'react-redux'
import { Box, Tooltip } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Close, RadioButtonUnchecked, Remove } from '@material-ui/icons'
import classNames from 'classnames'
import update from 'immutability-helper'
import { sendWs, SEND_BOARD } from '../../send'
import { recvBoard } from '../../redux/actions'
import './Board.scss'

const Board = ({ className, ws, user, board, updateBoard }) => {
  const [correct, setCorrect] = React.useState('none')

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
    sendWs(ws, SEND_BOARD, newBoard)
  }

  const changeCorrect = (evt, newCorrect) => {
    const newBoard = update(board, {
      correct: { $set: newCorrect },
    })
    if (board.open) {
      sendWs(ws, SEND_BOARD, newBoard)
    } else {
      updateBoard(newBoard)
    }
  }

  const boxClass = classNames(
    'board-text', {
      'correct': board.correct === 'correct',
      'wrong': board.correct === 'wrong',
      'open': board.open,
      'master': user.isMaster
    }
  )

  const box = user.isMaster && !board.open ? (
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
        <ToggleButton value="correct" aria-label="correct">
          <RadioButtonUnchecked fontSize="small" />
        </ToggleButton>
        <ToggleButton value="none" aria-label="none">
          <Remove fontSize="small" />
        </ToggleButton>
        <ToggleButton value="wrong" aria-label="wrong">
          <Close fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )

  return (
    <Box className={className}>
      { box }
      { user.isMaster ? buttons : null }
    </Box>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    user: state.user
  }),
  dispatch => ({
    updateBoard: board => dispatch(recvBoard(board))
  })
)(Board)

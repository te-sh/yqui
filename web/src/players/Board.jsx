import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Dvr, RadioButtonUnchecked } from '@material-ui/icons'
import update from 'immutability-helper'
import { recvBoard } from '../redux/actions'
import './Board.scss'

const Board = ({ className, isMaster, player, board, updateBoard }) => {
  const [status, setStatus] = React.useState([])

  React.useEffect(
    () => {
      let newStatus = []
      if (board.correct) {
        newStatus.push('correct')
      }
      if (board.open) {
        newStatus.push('open')
      }
      setStatus(newStatus)
    },
    [board]
  )

  const changeStatus = (evt, newStatus) => {
    const newBoard = update(board, {
      correct: { $set: newStatus.indexOf('correct') !== -1 },
      open: { $set: newStatus.indexOf('open') !== -1 }
    })
    updateBoard({ id: player, content: newBoard })
  }

  const buttons = (
    <Box className="board-buttons">
      <ToggleButtonGroup size="small" value={status} onChange={changeStatus}>
        <ToggleButton value="correct" aria-label="correct">
          <RadioButtonUnchecked />
        </ToggleButton>
        <ToggleButton value="open" aria-label="open">
          <Dvr />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )

  return (
    <Box className={className}>
      <Box className="board-text">
        { board.text }
      </Box>
      { isMaster ? buttons : null }
    </Box>
  )
}

export default connect(
  state => ({
    isMaster: state.isMaster
  }),
  dispatch => ({
    updateBoard: board => dispatch(recvBoard(board))
  })
)(Board)

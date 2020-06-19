import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { send } from '../communicate'
import { recvBoards } from '../redux/actions'
import './Boardactions.scss'

const Master = ({ className, ws, boards, boardLock, updateBoards }) => {
  const correctAll = () => {
    let newBoards = {}
    for (let player of Object.keys(boards)) {
      newBoards[player] = update(boards[player], {
        correct: { $set: true }
      })
    }
    updateBoards(newBoards)
  }

  const openAll = () => {
    let newBoards = {}
    for (let player of Object.keys(boards)) {
      newBoards[player] = update(boards[player], {
        open: { $set: true }
      })
    }
    updateBoards(newBoards)
  }

  return (
    <Paper className={className}>
      <Box className="boardactions-content">
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.boardLock(ws)}>
          { boardLock ? '回答ロック解除' : '回答ロック' }
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={correctAll}>
          すべて正解
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={openAll}>
          すべてオープン
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.boards(ws, boards)}>
          オープン
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    boards: state.boards,
    boardLock: state.boardLock
  }),
  dispatch => ({
    updateBoards: boards => dispatch(recvBoards(boards))
  })
)(Master)

import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormControlLabel, Switch } from '@material-ui/core'
import classNames from 'classnames'
import update from 'immutability-helper'
import { sendWs, BOARD_LOCK, BOARDS } from '../../lib/send'
import { clearEditBoards } from '../../redux/board_actions'

const Board = ({ className, board: { bg }, clearEditBoards }) => {
  const toggleBoardLock = () => {
    sendWs(BOARD_LOCK, !bg.lock)
  }

  const onOpenAll = () => {
    const boards = Object.fromEntries([...bg.boards.keys()].map(id => (
      [id, update(bg.boards.get(id), { open: { $set: true } })]
    )))
    clearEditBoards()
    sendWs(BOARDS, boards)
  }

  return (
    <Box className={classNames(className, 'board')}>
      <FormControlLabel
        control={
          <Switch color="primary" className="show-point"
                  checked={bg.lock}
                  onChange={toggleBoardLock} />
        }
        label="解答ロック" />
      <Button variant="outlined" color="default" className="open-all-button"
              onClick={onOpenAll}>
        すべてオープン
      </Button>
    </Box>
  )
}

export default connect(
  state => ({
    board: state.board
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Board)

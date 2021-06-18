import React from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import classNames from 'classnames'
import { sendWs, CLEAR } from '../../lib/send'
import { clearEditBoards } from '../../redux/board_actions'
import { setOpenClear } from '../../redux/open_actions'
import './Master.scss'

const Clear = ({ className, rule, clearEditBoards, setOpen }) => {
  const onAllClear = () => {
    clearEditBoards()
    sendWs(CLEAR)
  }

  return (
    <Box className={classNames(className, 'clear')}>
      <Button variant="outlined" color="default" className="all-clear-button"
              onClick={() => onAllClear()}>
        オールクリア
      </Button>
      <Button variant="outlined" color="default" className="partial-clear-button"
              onClick={() => setOpen(true)}>
        一部クリア
      </Button>
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards()),
    setOpen: open => dispatch(setOpenClear(open))
  })
)(Clear)

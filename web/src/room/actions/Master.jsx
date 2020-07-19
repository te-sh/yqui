import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import { intKeys } from '../../util'
import {
  sendWs, SEND_CORRECT, SEND_WRONG, SEND_THROUGH,
  SEND_RESET, SEND_ALL_CLEAR, SEND_UNDO, SEND_REDO,
  SEND_BOARDS, SEND_BOARD_LOCK
} from '../../communicate'
import './Actions.scss'

const Master = ({ className, ws, rule, boards, boardLock }) => {
  const openAll = () => {
    for (let player of intKeys(boards)) {
      boards[player].open = true
    }
    sendWs(ws, SEND_BOARDS, boards)
  }

  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 81:
        if (rule.board.active) {
          sendWs(ws, SEND_BOARD_LOCK)
        } else {
          sendWs(ws, SEND_CORRECT)
        }
        break
      case 87:
        if (rule.board.active) {
          openAll()
        } else {
          sendWs(ws, SEND_WRONG)
        }
        break
      case 69:
        sendWs(ws, SEND_THROUGH)
        break
      case 82:
        sendWs(ws, SEND_RESET)
        break
      case 84:
        sendWs(ws, SEND_ALL_CLEAR)
        break
      case 37:
        sendWs(ws, SEND_UNDO)
        break
      case 39:
        sendWs(ws, SEND_REDO)
        break
      default:
        break
    }
  }

  const normalButtons = (
    <Box>
      <Button variant="outlined" color="primary" size="large"
              onClick={() => sendWs(ws, SEND_CORRECT)}
              startIcon={<RadioButtonUnchecked />}>
        正解
      </Button>
      <Button variant="outlined" color="secondary" size="large"
              onClick={() => sendWs(ws, SEND_WRONG)}
              startIcon={<Close />}>
        不正解
      </Button>
    </Box>
  )

  const boardButtons = (
    <Box>
      <Button variant="outlined" color="default" size="large"
              onClick={() => sendWs(ws, SEND_BOARD_LOCK)}>
        { boardLock ? '回答ロック解除' : '回答ロック' }
      </Button>
      <Button variant="outlined" color="default" size="large"
              onClick={openAll}>
        すべてオープン
      </Button>
    </Box>
  )

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content">
        { rule.board.active ? boardButtons : normalButtons }
        <Button variant="outlined" color="default" size="large"
                onClick={() => sendWs(ws, SEND_THROUGH)}>
          次の問題
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => sendWs(ws, SEND_RESET)}>
          リセット
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => sendWs(ws, SEND_ALL_CLEAR)}>
          オールクリア
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => sendWs(ws, SEND_UNDO)}>
          Undo
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => sendWs(ws, SEND_REDO)}>
          Redo
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    rule: state.rule,
    boards: state.boards,
    boardLock: state.boardLock
  })
)(Master)

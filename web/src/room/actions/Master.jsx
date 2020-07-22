import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import { intKeys } from '../../lib/util'
import {
  sendWs, SEND_CORRECT, SEND_WRONG, SEND_THROUGH,
  SEND_RESET, SEND_ALL_CLEAR, SEND_UNDO, SEND_REDO,
  SEND_BOARDS, SEND_BOARD_LOCK
} from '../../lib/send'
import { clearEditBoards } from '../../redux/actions'
import './Actions.scss'

const Master = ({ className, ws, rule, bg, clearEditBoards }) => {
  const onCorrect = () => { sendWs(ws, SEND_CORRECT) }
  const onWrong = () => { sendWs(ws, SEND_WRONG) }

  const onThrough = () => {
    clearEditBoards()
    sendWs(ws, SEND_THROUGH)
  }
  const onReset = () => {
    clearEditBoards()
    sendWs(ws, SEND_RESET)
  }
  const onAllClear = () => {
    clearEditBoards()
    sendWs(ws, SEND_ALL_CLEAR)
  }

  const onUndo = () => { sendWs(ws, SEND_UNDO) }
  const onRedo = () => { sendWs(ws, SEND_REDO) }

  const onBoardLock = () => { sendWs(ws, SEND_BOARD_LOCK, !bg.lock) }
  const onOpenAll = () => {
    for (let player of intKeys(bg.boards)) {
      bg.boards[player].open = true
    }
    clearEditBoards()
    sendWs(ws, SEND_BOARDS, bg.boards)
  }

  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 81: // q
        if (rule.board.active) {
          onBoardLock()
        } else {
          onCorrect()
        }
        break
      case 87: // w
        if (rule.board.active) {
          onOpenAll()
        } else {
          onWrong()
        }
        break
      case 69: // e
        onThrough()
        break
      case 82: // r
        onReset()
        break
      case 84: // t
        onAllClear()
        break
      case 37: // <-
        onUndo()
        break
      case 39: // ->
        onRedo()
        break
      default:
        break
    }
  }

  const buttonAttr = { variant: 'outlined', size: 'large' }

  const normalButtons = (
    <>
      <Button {...buttonAttr} color="primary" onClick={onCorrect}
              startIcon={<RadioButtonUnchecked />}>
        正解
      </Button>
      <Button {...buttonAttr} color="secondary" onClick={onWrong}
              startIcon={<Close />}>
        不正解
      </Button>
    </>
  )

  const boardButtons = (
    <>
      <Button {...buttonAttr} color="default" onClick={onBoardLock}>
        { bg.lock ? '回答ロック解除' : '回答ロック' }
      </Button>
      <Button {...buttonAttr} color="default" onClick={onOpenAll}>
        すべてオープン
      </Button>
    </>
  )

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content">
        { rule.board.active ? boardButtons : normalButtons }
        <Button {...buttonAttr} color="default" onClick={onThrough}>
          次の問題
        </Button>
        <Button {...buttonAttr} color="default" onClick={onReset}>
          リセット
        </Button>
        <Button {...buttonAttr} color="default" onClick={onAllClear}>
          オールクリア
        </Button>
        <Button {...buttonAttr} color="default" onClick={onUndo}>
          Undo
        </Button>
        <Button {...buttonAttr} color="default" onClick={onRedo}>
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
    bg: state.bg
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Master)

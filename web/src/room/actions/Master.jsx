import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import update from 'immutability-helper'
import {
  sendWs, SEND_CORRECT, SEND_WRONG, SEND_THROUGH, SEND_RESET,
  SEND_UNDO, SEND_REDO, SEND_BOARDS, SEND_BOARD_LOCK
} from '../../lib/send'
import { clearEditBoards } from '../../redux/actions'
import './Actions.scss'

const Master = ({ className, rule, bg, clearEditBoards }) => {
  const onCorrect = nextQuiz => { sendWs(SEND_CORRECT, { nextQuiz }) }
  const onWrong = nextQuiz => { sendWs(SEND_WRONG, { nextQuiz }) }

  const onThrough = () => {
    clearEditBoards()
    sendWs(SEND_THROUGH)
  }
  const onReset = () => {
    clearEditBoards()
    sendWs(SEND_RESET)
  }

  const onUndo = () => { sendWs(SEND_UNDO) }
  const onRedo = () => { sendWs(SEND_REDO) }

  const onBoardLock = () => { sendWs(SEND_BOARD_LOCK, !bg.lock) }
  const onOpenAll = () => {
    const boards = Object.fromEntries([...bg.boards.keys()].map(id => (
      [id, update(bg.boards.get(id), { open: { $set: true } })]
    )))
    clearEditBoards()
    sendWs(SEND_BOARDS, boards)
  }

  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 81: // q
        if (rule.board.active) {
          onBoardLock()
        } else {
          onCorrect(!evt.shiftKey)
        }
        break
      case 87: // w
        if (rule.board.active) {
          onOpenAll()
        } else {
          onWrong(!evt.shiftKey)
        }
        break
      case 69: // e
        onThrough()
        break
      case 82: // r
        onReset()
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
      <Button {...buttonAttr} color="primary" className="correct-button"
              onClick={() => onCorrect(true)}
              startIcon={<RadioButtonUnchecked />}>
        正解
      </Button>
      <Button {...buttonAttr} color="secondary" className="wrong-button"
              onClick={() => onWrong(true)}
              startIcon={<Close />}>
        不正解
      </Button>
    </>
  )

  const boardButtons = (
    <>
      <Button {...buttonAttr} color="default" clasName="board-lock-button"
              onClick={onBoardLock}>
        { bg.lock ? '回答ロック解除' : '回答ロック' }
      </Button>
      <Button {...buttonAttr} color="default" className="open-all-button"
              onClick={onOpenAll}>
        すべてオープン
      </Button>
    </>
  )

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content master-actions">
        {rule.board.active ? boardButtons : normalButtons}
        <Button {...buttonAttr} color="default" className="through-button"
                onClick={onThrough}>
          次の問題
        </Button>
        <Button {...buttonAttr} color="default" className="reset-button"
                onClick={onReset}>
          リセット
        </Button>
        <Button {...buttonAttr} color="default" className="undo-button"
                onClick={onUndo}>
          Undo
        </Button>
        <Button {...buttonAttr} color="default" className="redo-button"
                onClick={onRedo}>
          Redo
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    bg: state.bg
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Master)

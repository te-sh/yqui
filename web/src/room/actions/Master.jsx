import React from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import classNames from 'classnames'
import { sendWs, CORRECT, WRONG, THROUGH, RESET, UNDO, REDO } from '../../lib/send'
import { clearEditBoards } from '../../redux/board_actions'
import './Actions.scss'

const Master = ({ className, hidden, rule, clearEditBoards }) => {
  const onCorrect = nextQuiz => { sendWs(CORRECT, { nextQuiz }) }
  const onWrong = nextQuiz => { sendWs(WRONG, { nextQuiz }) }

  const onThrough = () => {
    clearEditBoards()
    sendWs(THROUGH)
  }

  const onReset = () => {
    clearEditBoards()
    sendWs(RESET)
  }

  const onUndo = () => { sendWs(UNDO) }
  const onRedo = () => { sendWs(REDO) }

  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 81: // q
        onCorrect(!evt.shiftKey)
        break
      case 87: // w
        onWrong(!evt.shiftKey)
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

  return (
    <Box className={classNames(className, 'master-actions', { hidden })}
         tabIndex="0" onKeyDown={onKeyDown}>
      <Button variant="outlined" size="large"
              color="primary" className="correct-button"
              onClick={() => onCorrect(true)}
              startIcon={<RadioButtonUnchecked />}>
        正解
      </Button>
      <Button variant="outlined" size="large"
              color="secondary" className="wrong-button"
              onClick={() => onWrong(true)}
              startIcon={<Close />}>
        誤答
      </Button>
      <Button variant="outlined" size="large"
              color="default" className="through-button"
              onClick={onThrough}>
        次の問題
      </Button>
      <Button variant="outlined" size="large"
              color="default" className="reset-button"
              onClick={onReset}>
        リセット
      </Button>
      <Button variant="outlined" size="large"
              color="default" className="undo-button"
              onClick={onUndo}>
        Undo
      </Button>
      <Button variant="outlined" size="large"
              color="default" className="redo-button"
              onClick={onRedo}>
        Redo
      </Button>
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Master)

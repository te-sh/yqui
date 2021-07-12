import React from 'react'
import { connect } from 'react-redux'
import { Badge, Box, Button } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import classNames from 'classnames'
import { sendWs, CORRECT, WRONG, THROUGH, RESET, UNDO, REDO } from '../../lib/send'
import { clearEditBoards } from '../../redux/board_actions'
import './Actions.scss'

const Master = ({ className, hidden, rule, clearEditBoards }) => {
  const [focus, setFocus] = React.useState(false)

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
         tabIndex="0"
         onKeyDown={onKeyDown}
         onFocus={() => setFocus(true)}
         onBlur={() => setFocus(false)}>
      <Badge color="primary" overlap="circular"
             badgeContent="q" invisible={!focus}>
        <Button variant="outlined" size="large"
                color="primary" className="correct-button"
                onClick={() => onCorrect(true)}
                startIcon={<RadioButtonUnchecked />}>
          正解
        </Button>
      </Badge>
      <Badge color="primary" overlap="circular"
             badgeContent="w" invisible={!focus}>
        <Button variant="outlined" size="large"
                color="secondary" className="wrong-button"
                onClick={() => onWrong(true)}
                startIcon={<Close />}>
          誤答
        </Button>
      </Badge>
      <Badge color="primary" overlap="circular"
             badgeContent="e" invisible={!focus}>
        <Button variant="outlined" size="large"
                color="default" className="through-button"
                onClick={onThrough}>
          次の問題
        </Button>
      </Badge>
      <Badge color="primary" overlap="circular"
             badgeContent="r" invisible={!focus}>
        <Button variant="outlined" size="large"
                color="default" className="reset-button"
                onClick={onReset}>
          リセット
        </Button>
      </Badge>
      <Badge color="primary" overlap="circular"
             badgeContent="&#x2190;" invisible={!focus}>
        <Button variant="outlined" size="large"
                color="default" className="undo-button"
                onClick={onUndo}>
          Undo
        </Button>
      </Badge>
      <Badge color="primary" overlap="circular"
             badgeContent="&#x2192;" invisible={!focus}>
        <Button variant="outlined" size="large"
                color="default" className="redo-button"
                onClick={onRedo}>
          Redo
        </Button>
      </Badge>
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

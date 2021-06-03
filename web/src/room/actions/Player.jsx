import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, TextField } from '@material-ui/core'
import update from 'immutability-helper'
import classNames from 'classnames'
import { sendWs, PUSH, BOARD } from '../../lib/send'
import { openPrompt } from '../../lib/dialog'
import './Actions.scss'

const Player = ({ className, hidden, browser: { mobile }, selfID, rule, board: { bg } }) => {
  const [answer, setAnswer] = React.useState('')

  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 13:
        sendWs(PUSH)
        break
      default:
        break
    }
  }

  const sendAnswer = evt => {
    evt.preventDefault()
    sendBoard(answer)
    setAnswer('')
  }

  const sendAnswerMobile = () => {
    openPrompt({
      title: 'ボード',
      close: result => {
        if (result !== null) {
          sendBoard(result)
        }
      }
    })
  }

  const sendBoard = text => {
    const newBoard = update(bg.boards.get(selfID), {
      text: { $set: text }
    })
    sendWs(BOARD, newBoard)
  }

  const boardInput = (
    <Box>
      <form onSubmit={sendAnswer} className="boardactions-content">
        <TextField id="message" variant="outlined" size="small"
                   className="board-answer" autoComplete="off"
                   disabled={bg.lock} value={answer}
                   onChange={evt => setAnswer(evt.target.value)}
                   onKeyDown={evt => evt.stopPropagation()} />
        <Button type="submit" variant="outlined" color="default" size="large"
                className="board-answer-button" disabled={bg.lock}>
          ボード回答
        </Button>
      </form>
    </Box>
  )

  const boardInputMobile = (
    <Button disabled={bg.lock}
            onClick={sendAnswerMobile}>
      ボード
    </Button>
  )

  return (
    <Box className={classNames(className, 'player-actions', { hidden })}
         tabIndex="0" onKeyDown={onKeyDown}>
      <Button variant="outlined" color="primary" size="large"
              className="answer-button"
              onClick={() => sendWs(PUSH)}>
        早押し
      </Button>
      {rule.board.active && (mobile ? boardInputMobile : boardInput)}
    </Box>
  )
}

export default connect(
  state => ({
    browser: state.browser,
    selfID: state.selfID,
    rule: state.rule,
    board: state.board
  })
)(Player)

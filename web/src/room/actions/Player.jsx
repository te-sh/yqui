import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import update from 'immutability-helper'
import classNames from 'classnames'
import { sendWs, SEND_PUSH, SEND_BOARD } from '../../lib/send'
import './Actions.scss'

const Player = ({ className, selfID, isPlayer, rule, bg }) => {
  const [answer, setAnswer] = React.useState('')

  const onKeyDown = evt => {
    if (!isPlayer) {
      return
    }
    switch (evt.keyCode) {
      case 13:
        sendWs(SEND_PUSH)
        break
      default:
        break
    }
  }

  const sendAnswer = (evt) => {
    evt.preventDefault()
    const newBoard = update(bg.boards.get(selfID), {
      text: { $set: answer }
    })
    sendWs(SEND_BOARD, newBoard)
    setAnswer('')
  }

  const boardComponent = (
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

  const playerComponent = (
    <Box className={classNames('actions-content player-actions', { 'hidden': !isPlayer })}>
      <Button variant="outlined" color="primary" size="large"
              className="answer-button"
              onClick={() => sendWs(SEND_PUSH)}>
        早押し
      </Button>
      {rule.board.active && boardComponent}
    </Box>
  )

  const observerComponent = (
    <Box className={classNames('actions-content observer-actions', { 'hidden': isPlayer })}>
      <Typography variant="h6">
        あなたは観戦者です
      </Typography>
    </Box>
  )

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      {playerComponent}
      {observerComponent}
    </Paper>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    isPlayer: state.isPlayer,
    rule: state.rule,
    bg: state.bg
  })
)(Player)

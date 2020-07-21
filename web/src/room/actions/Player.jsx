import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import update from 'immutability-helper'
import { displayAttr } from '../../lib/util'
import { sendWs, SEND_PUSH, SEND_BOARD } from '../../lib/send'
import './Actions.scss'

const Player = ({ className, ws, selfID, isPlayer, rule, boards, boardLock }) => {
  const [answer, setAnswer] = React.useState('')

  const onKeyDown = evt => {
    if (!isPlayer) {
      return
    }
    switch (evt.keyCode) {
      case 13:
        sendWs(ws, SEND_PUSH)
        break
      default:
        break
    }
  }

  const klass = isPlayer ? 'player' : 'observer'

  const sendAnswer = (evt) => {
    evt.preventDefault()
    let newBoard = update(boards[selfID], {
      text: { $set: answer }
    })
    sendWs(ws, SEND_BOARD, newBoard)
    setAnswer('')
  }

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box {...displayAttr(klass === 'player')}>
        <Box className="actions-content">
          <Button variant="outlined" color="primary" size="large"
                  onClick={() => sendWs(ws, SEND_PUSH)}>
            早押し
          </Button>
          <Box {...displayAttr(rule.board.active)}>
            <form onSubmit={sendAnswer} className="boardactions-content">
              <TextField id="message" variant="outlined" size="small"
                         autoComplete="off" disabled={boardLock}
                         value={answer}
                         onChange={evt => setAnswer(evt.target.value)}
                         onKeyDown={evt => evt.stopPropagation()} />
              <Button type="submit" variant="outlined" color="default" size="large"
                      disabled={boardLock}>
                ボード回答
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Box {...displayAttr(klass === 'observer')}>
        <Box className="actions-content">
          <Typography variant="h6">
            あなたは観戦者です
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    selfID: state.selfID,
    isPlayer: state.isPlayer,
    rule: state.rule,
    boards: state.boards,
    boardLock: state.boardLock
  })
)(Player)

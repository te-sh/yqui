import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import update from 'immutability-helper'
import { send } from '../communicate'
import './Actions.scss'

const Player = ({ className, ws, selfID, isPlayer, rule, boards, boardLock }) => {
  const [answer, setAnswer] = React.useState('')

  const onKeyDown = evt => {
    if (!isPlayer) {
      return
    }
    switch (evt.keyCode) {
      case 13:
        send.pushButton(ws)
        break
      default:
        break
    }
  }

  const klass = isPlayer ? 'player' : 'observer'

  const sendAnswer = (evt) => {
    evt.preventDefault()
    let newBoard = update(boards[selfID], {
      $set: { text: answer }
    })
    send.board(ws, newBoard)
    setAnswer('')
  }

  const boardForm = (
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
  )

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content"
           style={{ visibility: klass === 'player' ? 'visible' : 'hidden' }}>
        <Button variant="outlined" color="primary" size="large"
                onClick={() => send.pushButton(ws)}>
          早押し
        </Button>
        { rule.board.active ? boardForm : null }
      </Box>
      <Box className="actions-content"
           style={{ visibility: klass === 'observer' ? 'visible' : 'hidden' }}>
        <Typography variant="h6">
          あなたは観戦者です
        </Typography>
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

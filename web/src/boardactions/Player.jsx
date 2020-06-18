import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper, TextField } from '@material-ui/core'
import { send } from '../communicate'
import './Boardactions.scss'

const Player = ({ className, ws, boardLock }) => {
  const [answer, setAnswer] = React.useState('')

  const sendAnswer = (evt) => {
    evt.preventDefault()
    send.boardText(ws, answer)
    setAnswer('')
  }

  return (
    <Paper className={className}>
      <form onSubmit={evt => sendAnswer(evt)} className="boardactions-content">
        <TextField id="message" variant="outlined" size="small"
                   disabled={boardLock}
                   value={answer}
                   onChange={evt => setAnswer(evt.target.value)} />
        <Button type="submit" variant="outlined" color="default" size="large"
                disabled={boardLock}>
          ボード回答
        </Button>
      </form>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    boardLock: state.boardLock
  })
)(Player)

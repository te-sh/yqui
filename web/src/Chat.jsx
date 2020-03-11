import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { send } from './communicate'
import './Chat.scss'

const Chat = ({ ws, isPlayer }) => {
  const [message, setMessage] = React.useState('')

  const chat = evt => {
    evt.preventDefault()
    if (message === '') {
      return;
    } else if (isPlayer && (message.startsWith('!') || message.startsWith('！'))) {
      send.pushButton(ws)
    } else {
      send.chat(ws, message)
    }
    setMessage('')
  }

  return (
    <Paper className="chat">
      <form onSubmit={evt => chat(evt)} className="chat-input">
        <TextField id="message" variant="outlined" fullWidth
                   value={message}
                   onChange={evt => setMessage(evt.target.value)} />
        <IconButton type="submit">
          <Edit />
        </IconButton>
      </form>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    isPlayer: state.isPlayer
  })
)(Chat)

import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { sendWs, SEND_PUSH, SEND_CHAT } from '../../send'
import './Chat.scss'

const Chat = ({ className, ws, isPlayer }) => {
  const [message, setMessage] = React.useState('')

  const chat = evt => {
    evt.preventDefault()
    if (message === '') {
      return
    } else if (isPlayer && (message.startsWith('!') || message.startsWith('！'))) {
      sendWs(ws, SEND_PUSH)
    } else {
      sendWs(ws, SEND_CHAT, message)
    }
    setMessage('')
  }

  return (
    <Paper className={className}>
      <form onSubmit={evt => chat(evt)} className="chat-input">
        <TextField id="message" variant="outlined" fullWidth
                   autoComplete="off"
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

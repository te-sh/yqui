import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { sendWs, SEND_PUSH, SEND_CHAT } from '../../lib/send'
import './Chat.scss'

const Chat = ({ className, isPlayer }) => {
  const [message, setMessage] = React.useState('')

  const chat = evt => {
    evt.preventDefault()
    if (message === '') {
      return
    } else if (isPlayer && (message.startsWith('!') || message.startsWith('！'))) {
      sendWs(SEND_PUSH)
    } else {
      sendWs(SEND_CHAT, message)
    }
    setMessage('')
  }

  return (
    <Paper className={className}>
      <form onSubmit={chat} className="chat-input">
        <TextField id="message" className="chat-text"
                   variant="outlined" fullWidth
                   autoComplete="off"
                   value={message}
                   onChange={evt => setMessage(evt.target.value)} />
        <IconButton type="submit" className="send-chat-button">
          <Edit />
        </IconButton>
      </form>
    </Paper>
  )
}

export default connect(
  state => ({
    isPlayer: state.isPlayer
  })
)(Chat)

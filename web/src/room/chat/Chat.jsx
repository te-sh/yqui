import React from 'react'
import { connect } from 'react-redux'
import { Button, IconButton, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { sendWs, SEND_PUSH, SEND_CHAT } from '../../lib/send'
import { openPrompt } from '../../lib/dialog'
import './Chat.scss'

const Chat = ({ className, mobile, isPlayer }) => {
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

  const chatMobile = () => {
    openPrompt({
      title: 'チャット',
      close: result => {
        if (result) {
          sendWs(SEND_CHAT, result)
        }
      }
    })
  }

  const chatInput = (
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
  )

  const chatButton = (
    <Button fullWidth onClick={chatMobile}>
      チャット入力
    </Button>
  )

  return (
    <Paper className={className}>
      {mobile ? chatButton : chatInput}
    </Paper>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    isPlayer: state.isPlayer
  })
)(Chat)

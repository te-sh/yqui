import React from 'react'
import { connect } from 'react-redux'
import { Button, IconButton, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { sendWs, PUSH, CHAT } from '../../lib/send'
import { openPrompt } from '../../lib/dialog'
import './Chat.scss'

const Chat = ({ className, browser: { mobile }, user }) => {
  const [message, setMessage] = React.useState('')

  const chat = evt => {
    evt.preventDefault()
    if (message === '') {
      return
    } else if (user.isPlayer && (message.startsWith('!') || message.startsWith('！'))) {
      sendWs(PUSH)
    } else {
      sendWs(CHAT, message)
    }
    setMessage('')
  }

  const chatMobile = () => {
    openPrompt({
      title: 'チャット',
      close: result => {
        if (result) {
          sendWs(CHAT, result)
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
      チャット
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
    browser: state.browser,
    user: state.user
  })
)(Chat)

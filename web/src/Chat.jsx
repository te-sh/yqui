import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const Chat = ({ ws }) => {
  const [message, setMessage] = React.useState('')

  const chat = evt => {
    evt.preventDefault()
    if (ws) {
      if (message === '') {
        return;
      } else if (message.startsWith('!') || message.startsWith('！')) {
        ws.send(JSON.stringify({ c: 'a' }))
      } else {
        ws.send(JSON.stringify({ c: 'c', a: message }))
      }
      setMessage('')
    }
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
    ws: state.ws
  })
)(Chat)

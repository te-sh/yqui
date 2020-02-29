import React from 'react'
import { connect } from 'react-redux'
import { IconButton, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const Chat = ({ props, state }) => {
  const [message, setMessage] = React.useState('')

  const chat = evt => {
    evt.preventDefault()
    if (state.ws) {
      state.ws.send(JSON.stringify({ c: "c", a: message }))
      setMessage("")
    }
  }

  return (
    <form onSubmit={evt => chat(evt)}>
      <TextField id="message" variant="outlined" fullWidth
                 value={message}
                 onChange={evt => setMessage(evt.target.value)} />
      <IconButton type="submit">
        <Edit />
      </IconButton>
    </form>
  )
}

export default connect(
  state => ({ state: {
    ws: state.ws
  }})
)(Chat)

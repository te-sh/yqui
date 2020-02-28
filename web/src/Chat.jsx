import React from 'react'
import { connect } from 'react-redux'
import { Grid, IconButton, TextField } from '@material-ui/core'
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
      <Grid container alignItems="center" wrap="nowrap">
        <Grid item>
          <TextField id="message" variant="outlined" fullWidth
                     value={message}
                     onChange={evt => setMessage(evt.target.value)} />
        </Grid>
        <Grid item>
          <IconButton type="submit">
            <Edit />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default connect(
  state => ({ state: {
    ws: state.ws
  }})
)(Chat)

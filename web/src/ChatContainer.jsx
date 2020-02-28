import React from 'react'
import { Grid } from '@material-ui/core'
import Chat from './Chat'
import Messages from './Messages'

const ChatContainer = props => {
  return (
    <Grid container direction="column" wrap="nowrap">
      <Grid item>
        <Chat />
      </Grid>
      <Grid item>
        <Messages />
      </Grid>
    </Grid>
  )
}

export default ChatContainer

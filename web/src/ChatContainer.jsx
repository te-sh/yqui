import React from 'react'
import { Grid } from '@material-ui/core'
import Chat from './Chat'
import Messages from './Messages'

const ChatContainer = props => {
  return (
    <Grid container direction="column" wrap="nowrap" style={{height: '100%', maxHeight: '100%'}}>
      <Grid item>
        <Chat />
      </Grid>
      <Grid item style={{flexGrow: 1}}>
        <Messages />
      </Grid>
    </Grid>
  )
}

export default ChatContainer

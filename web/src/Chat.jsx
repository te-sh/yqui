import React from 'react'
import { Card, CardContent, Grid, TextField } from '@material-ui/core'

const Chat = props => {
  return (
    <Grid container direction="column">
      <Grid item>
        <TextField id="message" variant="outlined" fullWidth />
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Chat

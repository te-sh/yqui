import React from 'react'
import { connect } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'

const Messages = ({ props, state }) => {
  console.log(state)
  const list = state.messages.map((message) => (
    <Typography key={message.time}>
      {message.name} &gt; {message.text}
    </Typography>
  ))

  return (
    <Card>
      <CardContent>
        {list}
      </CardContent>
    </Card>
  )
}

export default connect(
  state => ({ state: {
    messages: state.messages
  }})
)(Messages)

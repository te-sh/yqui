import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'

const Messages = ({ messages }) => {
  const list = messages.map((message) => (
    <Typography key={message.time}>
      {message.name} &gt; {message.text}
    </Typography>
  ))

  return (
    <Paper className="messages" style={{overflowY: 'scroll'}}>
      {list}
    </Paper>
  )
}

export default connect(
  state => ({
    messages: state.messages
  })
)(Messages)

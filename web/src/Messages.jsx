import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'

const Messages = ({ messages }) => {
  const rowContent = (message) => {
    switch (message.type) {
      case "message":
        return (
          <Typography key={message.time}>
            {message.name} &gt; {message.text}
          </Typography>
        )
      case "join":
        return (
          <Typography key={message.time} className="message-system">
            {message.name}さんが入室しました
          </Typography>
        )
      case "leave":
        return (
          <Typography key={message.time} className="message-system">
            {message.name}さんが退室しました
          </Typography>
        )
      default:
        return (<div></div>)
    }
  }

  const row = (message) => {
    return (
      <div className="message">
        {rowContent(message)}
      </div>
    )
  }

  return (
    <Paper className="messages" style={{overflowY: 'scroll'}}>
      {messages.map(row)}
    </Paper>
  )
}

export default connect(
  state => ({
    messages: state.messages
  })
)(Messages)

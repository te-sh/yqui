import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import './Messages.scss'

const Messages = ({ messages }) => {
  const ref = React.createRef()

  React.useEffect(
    () => {
      let el = ref.current
      el.scrollTop = el.scrollHeight
    },
    [messages, ref]
  )

  const rowContent = (message) => {
    switch (message.type) {
      case "message":
        return (
          <Typography>
            {message.name} &gt; {message.text}
          </Typography>
        )
      case "join":
        return (
          <Typography className="message-system">
            {message.name}さんが入室しました
          </Typography>
        )
      case "leave":
        return (
          <Typography className="message-system">
            {message.name}さんが退室しました
          </Typography>
        )
      default:
        return (<div></div>)
    }
  }

  const row = (message) => {
    return (
      <div key={message.time} className="message">
        {rowContent(message)}
      </div>
    )
  }

  return (
    <Paper className="messages" ref={ref} style={{overflowY: 'scroll'}}>
      {messages.map(row)}
    </Paper>
  )
}

export default connect(
  state => ({
    messages: state.messages
  })
)(Messages)

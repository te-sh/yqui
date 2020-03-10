import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import './Messages.scss'

const Messages = ({ chats }) => {
  const ref = React.createRef()

  React.useEffect(
    () => {
      let el = ref.current
      el.scrollTop = el.scrollHeight
    },
    [chats, ref]
  )

  const rowContent = (chat) => {
    switch (chat.type) {
      case "message":
        return (
          <Typography>
            {chat.name} &gt; {chat.text}
          </Typography>
        )
      case "join":
        return (
          <Typography className="message-system">
            {chat.name}さんが入室しました
          </Typography>
        )
      case "leave":
        return (
          <Typography className="message-system">
            {chat.name}さんが退室しました
          </Typography>
        )
      default:
        return (<div></div>)
    }
  }

  const row = (chat) => {
    return (
      <div key={chat.time} className="message">
        {rowContent(chat)}
      </div>
    )
  }

  return (
    <Paper className="messages" ref={ref}>
      {chats.map(row)}
    </Paper>
  )
}

export default connect(
  state => ({
    chats: state.chats
  })
)(Messages)

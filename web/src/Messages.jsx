import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import './Messages.scss'

const Messages = ({ className, chats }) => {
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
        return null
    }
  }

  const row = (chat) => {
    return (
      <Box key={chat.time} className="message">
        {rowContent(chat)}
      </Box>
    )
  }

  return (
    <Paper className={className} ref={ref}>
      {chats.map(row)}
    </Paper>
  )
}

export default connect(
  state => ({
    chats: state.chats
  })
)(Messages)

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

  const placeJoinLeave = { player: '', master: ' (司会) ', observer: ' (観戦) ' }
  const placeMove = { player: '解答席', master: '司会席', observer: '観戦席' }

  const rowContent = chat => {
    switch (chat.type) {
      case "message":
        return (
          <Typography className="message-normal">
            <span className="user-name">{chat.name}</span> &gt; {chat.text}
          </Typography>
        )
      case "join":
        return (
          <Typography className="message-system">
            <span className="user-name">{chat.name}</span>さん{placeJoinLeave[chat.text]}が入室しました
          </Typography>
        )
      case "leave":
        return (
          <Typography className="message-system">
            <span className="user-name">{chat.name}</span>さん{placeJoinLeave[chat.text]}が退室しました
          </Typography>
        )
      case "move":
        return (
          <Typography className="message-system">
            <span className="user-name">{chat.name}</span>さんが{placeMove[chat.text]}に移動しました
          </Typography>
        )
      default:
        return null
    }
  }

  const row = chat => {
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

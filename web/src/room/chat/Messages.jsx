import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import { format, fromUnixTime } from 'date-fns'
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

  const userName = chat => (
    <span className="user-name">{chat.name}</span>
  )

  const time = chat => (
    <span className="chat-time">
      ({format(fromUnixTime(chat.time / 1000), 'HH:mm:ss')})
    </span>
  )

  const content = chat => {
    switch (chat.type) {
      case "message":
        return (
          <span className="message-body message-normal">
            {userName(chat)} <span className="carret">&gt;</span> {chat.text}
          </span>
        )
      case "join":
        return (
          <span className="message-body message-system">
            {userName(chat)}さん{placeJoinLeave[chat.text]}が入室しました
          </span>
        )
      case "leave":
        return (
          <span className="message-body message-system">
            {userName(chat)}さん{placeJoinLeave[chat.text]}が退室しました
          </span>
        )
      case "move":
        return (
          <span className="message-body message-system">
            {userName(chat)}さんが{placeMove[chat.text]}に移動しました
          </span>
        )
      default:
        return null
    }
  }

  const row = chat => {
    return (
      <Box key={chat.time} className="message">
        <Typography className="message-content">
          {content(chat)}
          {time(chat)}
        </Typography>
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

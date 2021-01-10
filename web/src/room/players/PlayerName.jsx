import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import './PlayerName.scss'

const PlayerName = ({ player, myTurn, selfID, users }) => {
  const user = users.get(player)

  const nameClass = classNames('player-name-content', { 'my-turn': myTurn })
  const nameMainClass = classNames('player-name-content-main', { 'self': selfID === player })

  return (
    <Box className="player-name">
      <Box className={nameClass}
           style={{ borderColor: user.borderColor }}>
        <Typography className={nameMainClass}>
          <span className="chat-mark">
            {user.chatAnswer ? '©' : ''}
          </span>
          {user.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    users: state.users
  })
)(PlayerName)

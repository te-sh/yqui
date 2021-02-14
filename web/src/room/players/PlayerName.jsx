import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { classNamesK } from '../../lib/util'
import './PlayerName.scss'

const PlayerName = ({ player, myTurn, selfID, users }) => {
  const user = users.get(player)

  const nameClass = classNamesK('player-name-content', { myTurn: myTurn })
  const nameMainClass = classNamesK('player-name-content-main', { self: selfID === player })

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

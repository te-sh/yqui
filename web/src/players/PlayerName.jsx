import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import './PlayerName.scss'

const PlayerName = ({ player, right, selfID, users }) => {
  const nameClass = { 'pushed': right === player }
  const nameMainClass = { 'self': selfID === player }

  return (
    <Box className="player-name">
      <Box className={classNames('player-name-content', nameClass)}>
        <Typography className={classNames('player-name-content-main', nameMainClass)}>
          <span className="chat-mark">
            {users[player].chatAnswer ? '©' : ''}
          </span>
          {users[player].name}
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

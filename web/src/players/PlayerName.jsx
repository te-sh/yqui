import React from 'react'
import { connect } from 'react-redux'
import { Box, Icon, Typography } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import classNames from 'classnames'
import './PlayerName.scss'

const PlayerName = ({ player, right, selfID, users }) => {
  const nameClass = id => classNames(
    'content',
    { 'self': selfID === id },
    { 'pushed': right === id }
  )

  const icon = (
    <Icon fontSize="small">
      <KeyboardOutlined />
    </Icon>
  )

  return (
    <Box className="player-name">
      <Box className={nameClass(player)}>
        {users[player].chatAnswer ? icon : ''}
        <Typography>
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

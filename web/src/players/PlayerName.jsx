import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import './PlayerName.scss'

const PlayerName = ({ item, right, selfID, users }) => {
  const nameClass = id => classNames(
    'content',
    { 'self': selfID === id },
    { 'pushed': right === id }
  )

  const list = (() => {
    if (item.teamGame) {
      return item.team.map(id => (
        <Typography key={id} className={nameClass(id)}>
          {users[id].name}
        </Typography>
      ))
    } else {
      return (
        <Typography key={item.player} className={nameClass(item.player)}>
          {users[item.player].name}
        </Typography>
      )
    }
  })()

  const height = 1.5 * item.maxMember

  return (
    <Box className="player-name"
         style={{ height: height.toString() + 'em' }}>
      {list}
    </Box>
  )
}

export default connect(
  state => ({
    selfID: state.selfID,
    users: state.users
  })
)(PlayerName)

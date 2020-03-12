import React from 'react'
import { connect } from 'react-redux'
import { Box, Icon, Typography } from '@material-ui/core'
import { Keyboard } from '@material-ui/icons'
import classNames from 'classnames'
import './PlayerName.scss'

const PlayerName = ({ item, right, selfID, users }) => {
  const nameClass = id => classNames(
    'content',
    { 'self': selfID === id },
    { 'pushed': right === id }
  )

  const chip = (
    <Icon fontSize="small">
      <Keyboard />
    </Icon>
  )

  const list = (() => {
    if (item.teamGame) {
      return item.team.map(id => (
        <Box className={nameClass(id)} key={id}>
          {users[id].chatAnswer ? chip : ''}
          <Typography>
            {users[id].name}
          </Typography>
        </Box>
      ))
    } else {
      return (
        <Box key={item.player} className={nameClass(item.player)}>
          {users[item.player].chatAnswer ? chip : ''}
          <Typography>
            {users[item.player].name}
          </Typography>
        </Box>
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

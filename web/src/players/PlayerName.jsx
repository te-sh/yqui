import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import './PlayerName.scss'

const PlayerName = ({ teamGame, player, team, right, selfID, users }) => {
  const nameClass = id => classNames(
    'content',
    { 'self': player === selfID },
    { 'pushed': right === id }
  )

  const list = (() => {
    if (teamGame) {
      return team.map(id => (
        <Typography key={id} className={nameClass(id)}>
          {users[id].name}
        </Typography>
      ))
    } else {
      return (
        <Typography key={player} className={nameClass(player)}>
          {users[player].name}
        </Typography>
      )
    }
  })()

  return (
    <Box className="player-name">
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

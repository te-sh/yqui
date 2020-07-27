import React from 'react'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import Player from './Player'
import './Players.scss'

const Players = ({ className, team, teamIndex }) => {
  const playerComponent = (player, index) => (
    <Player key={player}
            player={player} playerIndex={index} teamIndex={teamIndex} />
  )

  return (
    <Box className={classNames(className, 'players')}>
      {team.players.map(playerComponent)}
    </Box>
  )
}

export default Players

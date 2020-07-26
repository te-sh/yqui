import React from 'react'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import PlayerDraggable from './PlayerDraggable'
import './Players.scss'

const Players = ({ className, team, teamIndex, movePlayer, updateTeams }) => {
  const playerDraggableComponent = (player, index) => (
    <PlayerDraggable key={player}
                     player={player} playerIndex={index} teamIndex={teamIndex}
                     movePlayer={movePlayer} droped={updateTeams} />
  )

  return (
    <Box className={classNames(className, 'players')}>
      {team.players.map(playerDraggableComponent)}
    </Box>
  )
}

export default Players

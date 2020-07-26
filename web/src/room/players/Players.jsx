import React from 'react'
import { Box } from '@material-ui/core'
import update from 'immutability-helper'
import classNames from 'classnames'
import PlayerDraggable from './PlayerDraggable'
import './Players.scss'

const Players = ({ className, team, teamIndex, updateTeam }) => {
  const [players, setPlayers] = React.useState(team.players)

  React.useEffect(
    () => {
      setPlayers(team.players)
    },
    [team]
  )

  const movePlayer = React.useCallback(
    (dragPlayerIndex, hoverPlayerIndex) => {
      const dragItem = players[dragPlayerIndex]
      const newPlayers = update(players, {
        $splice: [[dragPlayerIndex, 1], [hoverPlayerIndex, 0, dragItem]]
      })
      setPlayers(newPlayers)
    },
    [players]
  )

  const droped = () => {
    updateTeam({ id: team.id, players })
  }

  const playerDraggableComponent = (player, index) => (
    <PlayerDraggable key={player}
                     player={player} playerIndex={index} teamIndex={teamIndex}
                     movePlayer={movePlayer} droped={droped} />
  )

  return (
    <Box className={classNames(className, 'players')}>
      {players.map(playerDraggableComponent)}
    </Box>
  )
}

export default Players

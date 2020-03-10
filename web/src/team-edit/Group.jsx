import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from '../item_types'
import Player from './Player'

const Group = ({ label, players, teamIndex, droped }) => {
  const [, dropRef] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, _monitor) {
      droped(item, teamIndex)
    }
  })

  const playerElement = (player, playerIndex) => (
    <Player key={player} player={player}
            teamIndex={teamIndex} playerIndex={playerIndex} />
  )

  return (
    <fieldset className="team-edit-group" ref={dropRef}>
      <legend>{label}</legend>
      <div>
        {players.map(playerElement)}
      </div>
    </fieldset>
  )
}

export default Group

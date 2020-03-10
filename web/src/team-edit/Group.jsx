import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from '../item_types'
import Player from './Player'

const Group = ({ name, players, source, droped }) => {
  const [, dropRef] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, _monitor) {
      droped(item, source)
    }
  })

  const playerElement = (player, index) => (
    <Player key={player} player={player} source={source} index={index} />
  )

  return (
    <fieldset className="team-edit-group" ref={dropRef}>
      <legend>{name}</legend>
      <div>
        {players.map(playerElement)}
      </div>
    </fieldset>
  )
}

export default Group

import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from '../item_types'
import TeamEditPlayer from './TeamEditPlayer'

const TeamEditGroup = ({ name, players, source, dropped }) => {
  const [, dropRef] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, _monitor) {
      dropped(item, source)
    }
  })

  const playerElement = (player, index) => (
    <TeamEditPlayer key={player} player={player} source={source} index={index} />
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

export default TeamEditGroup

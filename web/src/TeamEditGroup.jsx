import React from 'react'
import TeamEditPlayer from './TeamEditPlayer'

const TeamEditGroup = ({ name, players, source }) => {
  const playerElement = (player, index) => (
    <TeamEditPlayer key={player} player={player} source={source} index={index} />
  )

  return (
    <fieldset className="team-edit-group">
      <legend>{name}</legend>
      {players.map(playerElement)}
    </fieldset>
  )
}

export default TeamEditGroup

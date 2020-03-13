import React from 'react'
import { useDrop } from 'react-dnd'
import { Box, FormControl, FormLabel } from '@material-ui/core'
import ItemTypes from '../item_types'
import Player from './Player'
import './Group.scss'

const Group = ({ label, team, teamIndex, droped }) => {
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
    <FormControl component="fieldset" className="team-edit-group" ref={dropRef}>
      <FormLabel component="legend">{label}</FormLabel>
      <Box className="content">
        {team.players.map(playerElement)}
      </Box>
    </FormControl>
  )
}

export default Group

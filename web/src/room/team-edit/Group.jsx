import React from 'react'
import { useDrop } from 'react-dnd'
import { Box, FormControl, FormLabel } from '@material-ui/core'
import ItemTypes from '../../item_types'
import Player from './Player'
import './Group.scss'

const Group = ({ label, team, teamIndex, droped }) => {
  const [, dropRef] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, _monitor) {
      droped(item, teamIndex)
    }
  })

  const list = team.players.map((player, index) => (
    <Player key={player}
            player={player} playerIndex={index} teamIndex={teamIndex} />
  ))

  return (
    <FormControl component="fieldset" className="team-edit-group" ref={dropRef}>
      <FormLabel component="legend">{label}</FormLabel>
      <Box className="team-edit-group-content">
        {list}
      </Box>
    </FormControl>
  )
}

export default Group

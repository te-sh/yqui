import React from 'react'
import { connect } from 'react-redux'
import { useDrag } from 'react-dnd'
import { Paper, Typography } from '@material-ui/core'
import ItemTypes from '../../item_types'
import './Player.scss'

const Player = ({ player, teamIndex, playerIndex, users }) => {
  const user = users.get(player)

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.PLAYER, player, teamIndex, playerIndex },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    })
  })

  return (
    <Paper className="team-edit-player"
           ref={dragRef} style={{ cursor: 'move', opacity }}>
      <Typography className="team-edit-player-content">
        {user.name}
      </Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    users: state.users
  })
)(Player)

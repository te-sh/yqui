import React from 'react'
import { connect } from 'react-redux'
import { useDrag } from 'react-dnd'
import { Paper, Typography } from '@material-ui/core'
import ItemTypes from './item_types'
import './TeamEditPlayer.scss'

const TeamEditPlayer = ({ player, source, index, users }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.PLAYER, player, source, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    })
  })

  return (
    <Paper className="team-edit-player"
           ref={dragRef} style={{ cursor: 'move', opacity }}>
      <Typography>
        {users[player].name}
      </Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    users: state.users
  })
)(TeamEditPlayer)

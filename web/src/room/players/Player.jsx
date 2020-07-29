import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../../lib/item_types'
import { movingPlayerOrder, movedPlayerOrder } from '../../lib/edit_team'
import PlayerContainer from './PlayerContainer'

const Player = ({ player, playerIndex, teamIndex }) => {
  const ref = React.useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragTeamIndex = item.teamIndex
      if (dragTeamIndex !== teamIndex) {
        return
      }
      const dragPlayerIndex = item.playerIndex
      if (dragPlayerIndex === playerIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      if ((dragPlayerIndex < playerIndex && hoverClientX < hoverMiddleX) ||
          (dragPlayerIndex > playerIndex && hoverClientX > hoverMiddleX)) {
        return
      }
      movingPlayerOrder(teamIndex, dragPlayerIndex, playerIndex)
      item.playerIndex = playerIndex
    },
    drop(item, _monitor) {
      const dragTeamIndex = item.teamIndex
      if (dragTeamIndex !== teamIndex) {
        return
      }
      movedPlayerOrder()
    }
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PLAYER, player, playerIndex, teamIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div ref={ref} style={{ cursor: 'move', opacity }}>
      <PlayerContainer player={player} />
    </div>
  )
}

export default Player

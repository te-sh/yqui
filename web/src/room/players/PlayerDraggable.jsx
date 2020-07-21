import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../../lib/item_types'
import Player from './Player'

const PlayerDraggable = ({ player, playerIndex, teamIndex, movePlayer, droped }) => {
  const ref = React.useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      if (item.teamIndex !== teamIndex) {
        return
      }
      const dragIndex = item.playerIndex
      const hoverIndex = playerIndex
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      if ((dragIndex < hoverIndex && hoverClientX < hoverMiddleX) ||
          (dragIndex > hoverIndex && hoverClientX > hoverMiddleX)) {
        return
      }
      movePlayer(dragIndex, hoverIndex)
      item.playerIndex = hoverIndex
    },
    drop(_item, _monitor) {
      droped()
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
      <Player player={player} />
    </div>
  )
}

export default PlayerDraggable

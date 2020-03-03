import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Player from './Player'

const ItemTypes = {
  PLAYER: 'Player'
}

const PlayerDraggable = ({ player, droped, index, movePlayer }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
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
      item.index = hoverIndex
    },
    drop(_item, _monitor) {
      droped()
    }
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PLAYER, player, index },
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

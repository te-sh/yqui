import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../../lib/item_types'
import PlayerContainer from './PlayerContainer'

const PlayerDraggable = ({ player, playerIndex, teamIndex, changingPlayerOrder, changePlayerOrder }) => {
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
      const hoverPlayerIndex = playerIndex
      if (dragPlayerIndex === hoverPlayerIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      if ((dragPlayerIndex < hoverPlayerIndex && hoverClientX < hoverMiddleX) ||
          (dragPlayerIndex > hoverPlayerIndex && hoverClientX > hoverMiddleX)) {
        return
      }
      changingPlayerOrder(dragTeamIndex, dragPlayerIndex, hoverPlayerIndex)
      item.playerIndex = hoverPlayerIndex
    },
    drop(_item, _monitor) {
      changePlayerOrder()
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

export default PlayerDraggable

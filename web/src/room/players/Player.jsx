import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import ItemTypes from '../../lib/item_types'
import {
  movingPlayerOrder, movedPlayerOrder, cancelMovePlayerOrder
} from '../../lib/assign'
import PlayerContainer from './PlayerContainer'
import './Player.scss'

const Player = ({ player, playerIndex, teamIndex }) => {
  const ref = React.useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    hover: (item, monitor) => {
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
    drop: (item, _monitor) => {
      const dragTeamIndex = item.teamIndex
      if (dragTeamIndex !== teamIndex) {
        return { moved: false }
      }
      movedPlayerOrder()
      return { moved: true }
    }
  })

  const [{ dragging }, drag] = useDrag({
    type: ItemTypes.PLAYER,
    item: () => ({ player, playerIndex, teamIndex }),
    end: (item, monitor) => {
      const result = monitor.getDropResult()
      if (!result || !result.moved) {
        cancelMovePlayerOrder()
      }
    },
    collect: monitor => ({
      dragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  return (
    <motion.div ref={ref} style={{ cursor: 'move' }}
                className={classNames('player', { dragging })}
                key={player} layout>
      <PlayerContainer player={player} />
    </motion.div>
  )
}

export default Player

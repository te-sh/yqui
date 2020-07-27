import React from 'react'
import { connect } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'
import ItemTypes from '../../lib/item_types'
import { sendWs, SEND_TEAMS } from '../../lib/send'
import { setEditTeams } from '../../redux/actions'
import PlayerContainer from './PlayerContainer'

const Player = ({ player, playerIndex, teamIndex, ws, teams, editTeams }) => {
  const ref = React.useRef(null)
  const curTeams = editTeams ? editTeams : teams
  const [players, setPlayers] = React.useState(curTeams.players)

  React.useEffect(
    () => {
      setPlayers((editTeams ? editTeams : teams).players)
    },
    [teams, editTeams]
  )

  const changingPlayerOrder = React.useCallback(
    (dragPlayerIndex) => {
      const player = players[dragPlayerIndex]
      const newPlayers = update(players, {
        $splice: [[dragPlayerIndex, 1], [playerIndex, 0, player]]
      })
      setPlayers(newPlayers)
    },
    [players]
  )

  const changePlayerOrder = () => {
    const newTeams = update(curTeams, {
      [teamIndex]: {
        players: { $set: players }
      }
    })
    if (editTeams) {
      setEditTeams(newTeams)
    } else {
      sendWs(ws, SEND_TEAMS, newTeams)
    }
  }

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
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      if ((dragPlayerIndex < playerIndex && hoverClientX < hoverMiddleX) ||
          (dragPlayerIndex > playerIndex && hoverClientX > hoverMiddleX)) {
        return
      }
      changingPlayerOrder(dragPlayerIndex)
      item.playerIndex = playerIndex
    },
    drop(item, _monitor) {
      const dragTeamIndex = item.teamIndex
      if (dragTeamIndex !== teamIndex) {
        return
      }
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

export default connect(
  state => ({
    ws: state.ws,
    teams: state.teams,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(Player)

import React from 'react'
import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import PlayerDraggable from './PlayerDraggable'
import { send } from './communicate'

const Players = ({ ws, attendees }) => {
  const [players, setPlayers] = React.useState(attendees.players)

  React.useEffect(
    () => {
      setPlayers(attendees.players)
    },
    [attendees.players]
  )

  const movePlayer = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = players[dragIndex]
      const newPlayers = update(players, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
      })
      setPlayers(newPlayers)
    },
    [players]
  )

  const list = players.map((player, index) => (
    <Grid item key={player}>
      <PlayerDraggable player={player} index={index}
                       movePlayer={movePlayer}
                       droped={() => send.playersOrder(ws, players)} />
    </Grid>
  ))

  return (
    <Paper className="players">
      <Grid container justify="center" alignItems="center">
        {list}
      </Grid>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    attendees: state.attendees
  })
)(Players)

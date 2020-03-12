import React from 'react'
import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import PlayerDraggable from './PlayerDraggable'
import { send } from '../communicate'
import './Players.scss'

const Players = ({ ws, attendees }) => {
  const [items, setItems] = React.useState([])

  React.useEffect(
    () => {
      if (attendees.teamGame) {
        setItems(attendees.teams.map(team => ({ teamGame: attendees.teamGame, team })))
      } else {
        setItems(attendees.players.map(player => ({ teamGame: attendees.teamGame, player })))
      }
    },
    [attendees]
  )

  const movePlayer = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = items[dragIndex]
      const newItems = update(items, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
      })
      setItems(newItems)
    },
    [items]
  )

  const sendAttendees = () => {
    if (attendees.teamGame) {
      send.attendees(ws, { teams: items.map(item => item.team) })
    } else {
      send.attendees(ws, { players: items.map(item => item.player) })
    }
  }

  const list = items.map((item, index) => (
    <Grid item key={item.player || item.team[0]}>
      <PlayerDraggable item={item} index={index}
                       movePlayer={movePlayer}
                       droped={sendAttendees} />
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

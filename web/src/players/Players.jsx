import React from 'react'
import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import PlayerDraggable from './PlayerDraggable'
import { send } from '../communicate'
import './Players.scss'

const Players = ({ ws, attendees }) => {
  const [players, setPlayers] = React.useState(attendees.players)
  const [teams, setTeams] = React.useState(attendees.teams)

  React.useEffect(
    () => {
      setPlayers(attendees.players)
      setTeams(attendees.teams)
    },
    [attendees.players, attendees.teams]
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

  const list = (() => {
    if (attendees.teamGame) {
      return teams.map((team, index) => (
        <Grid item key={team[0]}>
          <PlayerDraggable teamGame={attendees.teamGame} team={team} index={index}
                           movePlayer={movePlayer}
                           droped={() => send.attendees(ws, { players })} />
        </Grid>
      ))
    } else {
      return players.map((player, index) => (
        <Grid item key={player}>
          <PlayerDraggable teamGame={attendees.teamGame} player={player} index={index}
                           movePlayer={movePlayer}
                           droped={() => send.attendees(ws, { players })} />
        </Grid>
      ))
    }
  })()

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

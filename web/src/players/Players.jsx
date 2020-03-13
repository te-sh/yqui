import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import classNames from 'classnames'
import PlayerDraggable from './PlayerDraggable'
import './Players.scss'

const Players = ({ className, team, teamIndex }) => {
  const movePlayer = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = team.players[dragIndex]
      const newTeam = update(team, {
        player: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        }
      })
      console.log(newTeam)
    },
    [team]
  )

  const list = team.players.map((player, index) => (
    <Grid item key={player.id}>
      <PlayerDraggable player={player} playerIndex={index} teamIndex={teamIndex}
                       movePlayer={movePlayer} />
    </Grid>
  ))

  return (
    <Paper className={classNames(className, 'players')}>
      <Grid container justify="center" alignItems="center">
        {list}
      </Grid>
    </Paper>
  )
}

export default Players

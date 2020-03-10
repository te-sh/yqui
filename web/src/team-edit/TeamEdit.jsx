import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import update from 'immutability-helper'
import Group from './Group'
import './TeamEdit.scss'

const TeamEdit = ({ teamEdit, attendees }) => {
  const [players, setPlayers] = React.useState(attendees.players)
  const [observers, setObservers] = React.useState(attendees.observers)

  React.useEffect(
    () => {
      if (!teamEdit) {
        setPlayers(attendees.players)
        setObservers(attendees.observers)
      }
    },
    [teamEdit, attendees]
  )

  const droped = (item, destination) => {
    if (item.source === destination) {
      return
    }

    switch (item.source) {
      case 'players':
        setPlayers(update(players, { $splice: [[item.index, 1]] }))
        break
      case 'observers':
        setObservers(update(observers, { $splice: [[item.index, 1]] }))
        break
      default:
        break
    }

    switch (destination) {
      case 'players':
        setPlayers(update(players, { $push: [item.player] }))
        break
      case 'observers':
        setObservers(update(observers, { $push: [item.player] }))
        break
      default:
        break
    }
  }

  return (
    <Paper className="team-edit">
      <Group name="参加者" players={players} source="players"
             droped={droped} />
      <Group name="観戦者" players={observers} source="observers"
             droped={droped} />
    </Paper>
  )
}

export default connect(
  state => ({
    attendees: state.attendees
  })
)(TeamEdit)

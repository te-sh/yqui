import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import TeamEditGroup from './TeamEditGroup'
import './TeamEdit.scss'

const TeamEdit = ({ teamEdit, users, attendees }) => {
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

  return (
    <Paper className="team-edit">
      <TeamEditGroup name="参加者" players={players} source="players" />
      <TeamEditGroup name="観戦者" players={observers} source="observers" />
    </Paper>
  )
}

export default connect(
  state => ({
    users: state.users,
    attendees: state.attendees
  })
)(TeamEdit)

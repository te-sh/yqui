import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
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

  const playerElement = player => (
    <Paper className="player" key={player}>
      <Typography>
        {users[player].name}
      </Typography>
    </Paper>
  )

  return (
    <Paper className="team-edit">
      <fieldset className="players users">
        <legend>参加者</legend>
        {players.map(playerElement)}
      </fieldset>
      <fieldset className="observers users">
        <legend>観戦者</legend>
        {observers.map(playerElement)}
      </fieldset>
    </Paper>
  )
}

export default connect(
  state => ({
    users: state.users,
    attendees: state.attendees
  })
)(TeamEdit)

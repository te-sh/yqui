import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'
import { send } from '../communicate'
import { editTeamToAttendees } from '../team'
import { setEditTeam } from '../redux/actions'
import './Actions.scss'

const TeamEdit = ({ ws, editTeam, setEditTeam }) => {
  const onSubmit = () => {
    send.attendees(ws, editTeamToAttendees(editTeam))
    close()
  }

  const close = () => {
    setEditTeam(null)
  }

  return (
    <Paper className="actions">
      <Button variant="outlined" color="primary" size="large"
              onClick={onSubmit}>
        設定
      </Button>
      <Button variant="outlined" color="secondary" size="large"
              onClick={close}>
        閉じる
      </Button>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    editTeam: state.editTeam
  }),
  dispatch => ({
    setEditTeam: attendees => dispatch(setEditTeam(attendees))
  })
)(TeamEdit)

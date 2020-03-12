import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { send } from '../communicate'
import { editTeamToAttendees } from '../team'
import { setEditTeam } from '../redux/actions'
import './Actions.scss'

const TeamEdit = ({ className, ws, editTeam, setEditTeam }) => {
  const onSubmit = () => {
    send.attendees(ws, editTeamToAttendees(editTeam))
    close()
  }

  const close = () => {
    setEditTeam(null)
  }

  return (
    <Paper className={className}>
      <Box className="content">
        <Button variant="outlined" color="primary" size="large"
                onClick={onSubmit}>
          設定
        </Button>
        <Button variant="outlined" color="secondary" size="large"
                onClick={close}>
          閉じる
        </Button>
      </Box>
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

import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'
import { setEditTeam } from '../redux/actions'
import './Actions.scss'

const TeamEdit = ({ editTeam, setEditTeam }) => {
  const submit = () => {
    console.log(editTeam)
    close()
  }

  const close = () => {
    setEditTeam(null)
  }

  return (
    <Paper className="actions">
      <Button variant="outlined" color="primary" size="large"
              onClick={submit}>
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
    editTeam: state.editTeam
  }),
  dispatch => ({
    setEditTeam: attendees => dispatch(setEditTeam(attendees))
  })
)(TeamEdit)

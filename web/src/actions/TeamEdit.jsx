import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { send } from '../communicate'
import { editTeamsToTeams } from '../team'
import { setEditTeams } from '../redux/actions'
import './Actions.scss'

const TeamEdit = ({ className, ws, editTeams, setEditTeams }) => {
  const onSubmit = () => {
    send.teams(ws, editTeamsToTeams(editTeams))
    close()
  }

  const close = () => {
    setEditTeams(null)
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
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(TeamEdit)

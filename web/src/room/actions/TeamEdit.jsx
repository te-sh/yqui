import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { sendWs, SEND_TEAMS } from '../../send'
import { editTeamsToTeams } from '../../team'
import { setEditTeams } from '../../redux/actions'
import './Actions.scss'

const TeamEdit = ({ className, ws, editTeams, setEditTeams }) => {
  const onSubmit = () => {
    sendWs(ws, SEND_TEAMS, editTeamsToTeams(editTeams))
    close()
  }

  const close = () => {
    setEditTeams(null)
  }

  return (
    <Paper className={className}>
      <Box className="actions-content">
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

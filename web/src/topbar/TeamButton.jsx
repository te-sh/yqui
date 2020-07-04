import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { SupervisorAccount } from '@material-ui/icons'
import { setEditTeams } from '../redux/actions'
import { teamsToEditTeams } from '../team'

const TeamButton = ({ users, teams, master, isMaster, editTeams, setEditTeams }) => {
  const teamEdit = () => {
    setEditTeams(teamsToEditTeams(users, teams, master))
  }

  return (
    <Box>
      <Tooltip title="チーム">
        <span>
          <IconButton color="inherit"
                      disabled={!isMaster || !!editTeams}
                      onClick={teamEdit}>
            <SupervisorAccount />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  state => ({
    users: state.users,
    teams: state.teams,
    master: state.master,
    isMaster: state.isMaster,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(TeamButton)

import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { SupervisorAccount } from '@material-ui/icons'
import { teamsToEditTeams } from '../../team'
import { setEditTeams } from '../../redux/actions'

const TeamButton = ({ users, teams, master, isMaster, rule, editTeams, setEditTeams }) => {
  const teamEdit = () => {
    setEditTeams(teamsToEditTeams(users, teams, master))
  }

  return (
    <Box>
      <Tooltip title="チーム">
        <span>
          <IconButton color="inherit"
                      disabled={!isMaster || !rule.team.active || !!editTeams}
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
    rule: state.rule,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(TeamButton)

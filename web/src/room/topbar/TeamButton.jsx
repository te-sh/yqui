import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { SupervisorAccount } from '@material-ui/icons'
import { teamsToEditTeams } from '../../lib/team'
import { setEditTeams } from '../../redux/actions'

const TeamButton = ({ users, user, teams, rule, editTeams, setEditTeams }) => {
  const teamEdit = () => {
    setEditTeams(teamsToEditTeams(users, teams))
  }

  return (
    <Box>
      <Tooltip title="チーム">
        <span>
          <IconButton color="inherit"
                      disabled={!user.isMaster || !rule.team.active || !!editTeams}
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
    user: state.user,
    teams: state.teams,
    rule: state.rule,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(TeamButton)

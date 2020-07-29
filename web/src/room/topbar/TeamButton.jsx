import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { SupervisorAccount } from '@material-ui/icons'
import { beginEditTeams } from '../../lib/edit_team'

const TeamButton = ({ user, rule, editTeams }) => {
  return (
    <Box>
      <Tooltip title="チーム">
        <span>
          <IconButton color="inherit"
                      disabled={!user.isMaster || !rule.team.active || !!editTeams}
                      onClick={beginEditTeams}>
            <SupervisorAccount />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    rule: state.rule,
    editTeams: state.editTeams
  })
)(TeamButton)

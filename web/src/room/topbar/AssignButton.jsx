import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { SupervisorAccount } from '@material-ui/icons'
import { beginEditTeams } from '../../lib/assign'

const AssignButton = ({ mobile, user, rule, editTeams }) => {
  const disabled = !user.isMaster || !rule.team.active || !!editTeams

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="配置">
          <span>
            <IconButton className="assign-button"
                        color="inherit"
                        disabled={disabled} onClick={beginEditTeams}>
              <SupervisorAccount />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button
                disabled={disabled} onClick={beginEditTeams}>
        <ListItemIcon><SupervisorAccount /></ListItemIcon>
        <ListItemText>チーム</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    mobile: state.mobile,
    user: state.user,
    rule: state.rule,
    editTeams: state.editTeams
  })
)(AssignButton)

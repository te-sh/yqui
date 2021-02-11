import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import { sendWs, SEND_TOGGLE_MASTER } from '../../lib/send'

const MasterButton = ({ mobile, user, master, isPlayer, editTeams }) => {
  const onToggleMaster = () => {
    sendWs(SEND_TOGGLE_MASTER)
  }

  const disabled = (!user.isMaster && (master !== undefined || !isPlayer)) || !!editTeams

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="司会">
          <span>
            <IconButton className="toggle-master-button"
                        color={user.isMaster ? 'secondary' : 'inherit'}
                        disabled={disabled} onClick={onToggleMaster}>
              <Portrait />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button
                disabled={disabled} onClick={onToggleMaster}>
        <ListItemIcon><Portrait /></ListItemIcon>
        <ListItemText>司会</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    mobile: state.mobile,
    user: state.user,
    master: state.master,
    isPlayer: state.isPlayer,
    editTeams: state.editTeams
  })
)(MasterButton)

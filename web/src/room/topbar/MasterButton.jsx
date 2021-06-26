import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import { sendWs, TOGGLE_MASTER } from '../../lib/send'

const MasterButton = ({ browser: { mobile }, user, summary: { masterName }, editTeams }) => {
  const onToggleMaster = () => {
    sendWs(TOGGLE_MASTER)
  }

  const disabled = (!user.isMaster && !!masterName) || user.isObserver || !!editTeams

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
      <ListItem button disabled={disabled} onClick={onToggleMaster}>
        <ListItemIcon><Portrait /></ListItemIcon>
        <ListItemText>司会</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    browser: state.browser,
    user: state.user,
    summary: state.summary,
    editTeams: state.editTeams
  })
)(MasterButton)

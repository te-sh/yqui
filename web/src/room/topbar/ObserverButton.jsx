import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import { sendWs, TOGGLE_OBSERVER } from '../../lib/send'

const ObserverButton = ({ browser: { mobile }, user }) => {
  const toggleObserver = () => { sendWs(TOGGLE_OBSERVER) }
  const isObserver = !user.isMaster && !user.isPlayer

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="観戦">
          <span>
            <IconButton className="toggle-observer-button"
                        color={isObserver ? 'secondary' : 'inherit'}
                        disabled={user.isMaster} onClick={toggleObserver}>
              <Visibility />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button disabled={user.isMaster} onClick={toggleObserver}>
        <ListItemIcon><Visibility /></ListItemIcon>
        <ListItemText>観戦</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    browser: state.browser,
    user: state.user
  })
)(ObserverButton)

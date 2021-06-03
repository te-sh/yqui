import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { PlaylistAddCheck } from '@material-ui/icons'
import { setOpenRule } from '../../redux/open_actions'

const RuleButton = ({ mobile, user, editTeams, setOpen }) => {
  const open = () => {
    setOpen(true)
  }

  const disabled = !user.isMaster || !!editTeams

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="ルール">
          <span>
            <IconButton className="open-rule-button" color="inherit"
                        disabled={disabled} onClick={open}>
              <PlaylistAddCheck />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button disabled={disabled} onClick={open}>
        <ListItemIcon><PlaylistAddCheck /></ListItemIcon>
        <ListItemText>ルール</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    browser: state.browser,
    user: state.user,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenRule(open))
  })
)(RuleButton)

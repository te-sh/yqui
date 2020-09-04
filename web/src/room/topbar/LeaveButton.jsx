import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { setOpenLeave } from '../../redux/actions'

const LeaveButton = ({ mobile, setOpen }) => {
  const open = () => {
    setOpen(true)
  }

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="退室">
          <span>
            <IconButton color="inherit" onClick={open}>
              <Close />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button onClick={open}>
        <ListItemIcon><Close /></ListItemIcon>
        <ListItemText>退室</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    mobile: state.mobile
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenLeave(open))
  })
)(LeaveButton)

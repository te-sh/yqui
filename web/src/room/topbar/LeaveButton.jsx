import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { sendWs, LEAVE } from '../../lib/send'
import { openConfirm } from '../../lib/dialog'
import { reset } from '../../redux/actions'

const LeaveButton = ({ mobile, reset }) => {
  const leave = () => {
    openConfirm({
      title: '退室',
      message: '退室します. よろしいですか?',
      close: result => {
        if (result) {
          sendWs(LEAVE)
          reset()
        }
      }
    })
  }

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="退室">
          <span>
            <IconButton className="leave-room-button" color="inherit"
                        onClick={leave}>
              <Close />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button onClick={leave}>
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
    reset: () => dispatch(reset())
  })
)(LeaveButton)

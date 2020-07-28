import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { sendWs, SEND_LEAVE } from '../../lib/send'
import { reset } from '../../redux/actions'

const LeaveButton = ({ reset }) => {
  const leave = () => {
    sendWs(SEND_LEAVE)
    reset()
  }

  return (
    <Box>
      <Tooltip title="退室">
        <span>
          <IconButton color="inherit" onClick={leave}>
            <Close />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  null,
  dispatch => ({
    reset: () => dispatch(reset())
  })
)(LeaveButton)

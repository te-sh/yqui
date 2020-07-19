import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { sendWs, SEND_LEAVE } from '../../send'
import { reset } from '../../redux/actions'

const LeaveButton = ({ ws, reset }) => {
  const leave = () => {
    sendWs(ws, SEND_LEAVE)
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
  state => ({
    ws: state.ws
  }),
  dispatch => ({
    reset: () => dispatch(reset())
  })
)(LeaveButton)

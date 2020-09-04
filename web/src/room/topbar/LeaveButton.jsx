import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { setOpenLeave } from '../../redux/actions'

const LeaveButton = ({ setOpen }) => {
  const open = () => {
    setOpen(true)
  }

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
}

export default connect(
  null,
  dispatch => ({
    setOpen: open => dispatch(setOpenLeave(open))
  })
)(LeaveButton)

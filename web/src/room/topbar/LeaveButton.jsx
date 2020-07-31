import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { sendWs, SEND_LEAVE } from '../../lib/send'
import { reset } from '../../redux/actions'
import LeaveConfirm from '../dialogs/LeaveConfirm'

const LeaveButton = ({ reset }) => {
  const [openConfirm, setOpenConfirm] = React.useState(false)

  const open = () => {
    setOpenConfirm(true)
  }

  const leave = () => {
    close()
    sendWs(SEND_LEAVE)
    reset()
  }

  const close = () => {
    setOpenConfirm(false)
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
      <LeaveConfirm open={openConfirm} ok={leave} cancel={close} />
    </Box>
  )
}

export default connect(
  null,
  dispatch => ({
    reset: () => dispatch(reset())
  })
)(LeaveButton)

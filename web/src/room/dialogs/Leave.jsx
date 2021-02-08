import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { sendWs, SEND_LEAVE } from '../../lib/send'
import { reset, setOpenLeave } from '../../redux/actions'

const Leave = ({ open, setOpen, reset }) => {
  const ok = () => {
    setOpen(false)
    sendWs(SEND_LEAVE)
    reset()
  }

  const cancel = () => {
    setOpen(false)
  }

  return (
    <Dialog className="leave-room-dialog" open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">退室</DialogTitle>
      <DialogContent>
        <Typography>
          退室します. よろしいですか?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button className="submit" color="primary" onClick={ok}>
          はい
        </Button>
        <Button className="close" color="secondary" onClick={cancel}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    open: state.open.leave
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenLeave(open)),
    reset: () => dispatch(reset())
  })
)(Leave)

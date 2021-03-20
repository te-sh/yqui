import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { setConfirm } from '../redux/actions'

const Confirm = ({ confirm, setConfirm }) => {
  const info = confirm || {}

  const ok = () => {
    setConfirm(null)
    if (confirm.close) {
      confirm.close(true)
    }
  }

  const cancel = () => {
    setConfirm(null)
    if (confirm.close) {
      confirm.close(false)
    }
  }

  return (
    <Dialog className="confirm-dialog" open={!!confirm}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{info.title}</DialogTitle>
      <DialogContent>
        <Typography className="message">
          {info.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button className="ok" color="primary" onClick={ok}>
          OK
        </Button>
        <Button className="cancel" color="secondary" onClick={cancel}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    confirm: state.dialog.confirm
  }),
  dispatch => ({
    setConfirm: confirm => dispatch(setConfirm(confirm))
  })
)(Confirm)

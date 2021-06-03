import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { setAlert } from '../redux/dialog_actions'

const Alert = ({ alert, setAlert }) => {
  const info = alert || {}

  const close = () => {
    setAlert(null)
  }

  return (
    <Dialog className="alert-dialog" open={!!alert}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{info.title}</DialogTitle>
      <DialogContent>
        <Typography className="message">
          {info.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button className="close" color="secondary" onClick={close}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    alert: state.dialog.alert
  }),
  dispatch => ({
    setAlert: alert => dispatch(setAlert(alert))
  })
)(Alert)

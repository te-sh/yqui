import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { setAlert } from './redux/actions'

const Alert = ({ alert, setAlert }) => {
  const open = !!alert
  const display = alert || {}

  const close = () => {
    setAlert(null)
  }

  return (
    <Dialog className="alert-dialog" open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{display.title}</DialogTitle>
      <DialogContent>
        <Typography className="message">
          {display.message}
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
    alert: state.alert
  }),
  dispatch => ({
    setAlert: alert => dispatch(setAlert(alert))
  })
)(Alert)

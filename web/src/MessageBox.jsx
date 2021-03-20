import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { initMessageBox } from './lib/message_box'
import { setMessageBox } from './redux/actions'

const MessageBox = ({ messageBox, setMessageBox }) => {
  const close = () => {
    setMessageBox(initMessageBox)
  }

  return (
    <Dialog className="message-box-dialog" open={messageBox.open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{messageBox.title}</DialogTitle>
      <DialogContent>
        <Typography className="message">
          {messageBox.message}
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
    messageBox: state.messageBox
  }),
  dispatch => ({
    setMessageBox: value => dispatch(setMessageBox(value))
  })
)(MessageBox)

import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'

const ShareButtonHelp = ({ open, close }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">ボタン共有ルール</DialogTitle>
      <DialogContent className="help">
        <Typography>
          ある人がボタンを押しているときにその人と同じチームの他の人はボタンを押すことができません.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={close}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShareButtonHelp

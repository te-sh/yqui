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
          同じチームの他の人がボタンを押しているときはボタンを押すことができません.
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

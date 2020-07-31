import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import './Help.scss'

const LeaveConfirm = ({ open, ok, cancel }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">退室</DialogTitle>
      <DialogContent>
        <Typography>
          退室します. よろしいですか?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={ok}>
          はい
        </Button>
        <Button color="secondary" onClick={cancel}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LeaveConfirm

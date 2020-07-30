import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'

const UpdownHelp = ({ open, close }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">アップダウンルール</DialogTitle>
      <DialogContent className="help">
        <Typography>
          誤答時にポイントが 0 になります.
        </Typography>
        <Typography>
          その他の誤答罰も適用されます.
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

export default UpdownHelp

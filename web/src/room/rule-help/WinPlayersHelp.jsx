import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'

const WinPlayersHelp = ({ open, close }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">勝ち抜け人数</DialogTitle>
      <DialogContent className="help">
        <Typography>
          この値はルール表示にだけ使用されます. それ以外の処理は行われません.
        </Typography>
        <Typography>
          この値を 0 以下にするとルール表示で表示されません.
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

export default WinPlayersHelp

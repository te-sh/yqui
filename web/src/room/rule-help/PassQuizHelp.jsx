import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'

const PassQuizHelp = ({ open, close }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">通過クイズルール</DialogTitle>
      <DialogContent className="help">
        <Typography>
          勝ち抜けポイント以上に到達したら通過席につきます.
        </Typography>
        <Typography>
          通過席についているときに正解すると勝ち抜けです.
        </Typography>
        <Typography>
          通過席についているときに誤答した場合, もしくは他の人が正解した場合はポイントが 0 になります.
        </Typography>
        <Typography>
          通過席についているときに誤答した場合はポイント以外の誤答罰も適用されます.
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

export default PassQuizHelp

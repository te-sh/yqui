import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'

const SwedishHelp = ({ open, close }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Swedishルール</DialogTitle>
      <DialogContent className="help">
        <Typography>
          誤答したときに与えられるバツの数がそのときのポイントに依存します.
        </Typography>
        <Typography>
          0ポイントのときは1バツ, 1か2ポイントのときは2バツ, 3か4か5ポイントのときは3バツ…となります.
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

export default SwedishHelp

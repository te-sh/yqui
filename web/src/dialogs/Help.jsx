import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import './Help.scss'

const Help = ({ open, close }) => {
  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">操作方法</DialogTitle>
      <DialogContent className="help">
        <Typography variant="h6">
          早押しの方法
        </Typography>
        <ul>
          <li>
            <Typography>
              画面下部の
              <Button variant="outlined" color="primary" size="large">
                早押し
              </Button>
              をクリックする
            </Typography>
          </li>
          <li>
            <Typography>
              画面下部の
              <Button variant="outlined" color="primary" size="large">
                早押し
              </Button>
              の周りのエリアをクリックした後, Enter キーを押す
            </Typography>
          </li>
          <li>
            <Typography>
              画面左下部のチャット入力欄に '!' (半角/全角どちらも可) を入力して, Enter キーを押す
            </Typography>
          </li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={close}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Help

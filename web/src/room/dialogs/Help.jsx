import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { setOpenHelp } from '../../redux/actions'
import './Help.scss'

const Help = ({ open }) => {
  const close = () => {
    setOpenHelp(false)
  }

  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">操作方法</DialogTitle>
      <DialogContent className="help">
        <Typography variant="h6">
          早押しの方法
        </Typography>
        <Typography>
          以下の方法のうち, お好みの方法を選んでください.
        </Typography>
        <ul>
          <li>
            <Typography>
              画面下部の
              <Button variant="outlined" color="primary">
                早押し
              </Button>
              をクリックする
            </Typography>
          </li>
          <li>
            <Typography>
              画面下部の
              <Button variant="outlined" color="primary">
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
        <Typography variant="h6">
          チャット回答マーク
        </Typography>
        <Typography>
          設定でチャット回答マークをオンにすると名前欄にチャット回答マークが付きます.
          こうすると回答時にカウントを長めにしてもらえるかもしれません.
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

export default connect(
  state => ({
    open: state.open.help
  })
)(Help)

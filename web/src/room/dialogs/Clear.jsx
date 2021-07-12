import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControlLabel, FormGroup, Typography
} from '@material-ui/core'
import { sendWs, CLEAR } from '../../lib/send'
import { setOpenClear } from '../../redux/open_actions'
import './Clear.scss'

const Clear = ({ rule, open, setOpen }) => {
  const [win, setWin] = React.useState(true)
  const [lose, setLose] = React.useState(true)
  const [winTimes, setWinTimes] = React.useState(true)

  const onEnter = async () => {
    setWin(true)
    setLose(true)
    setWinTimes(true)
  }

  const ok = () => {
    setOpen(false)
    sendWs(CLEAR, { win, lose, winTimes })
  }

  const cancel = () => {
    setOpen(false)
  }

  return (
    <Dialog className="clear-dialog" open={open}
            TransisionProps={{ onEnter }}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">クリア</DialogTitle>
      <DialogContent>
        <Typography className="text">
          スコア, ボタン, ボードに加えて下記のチェックされた項目をクリアします.
        </Typography>
        <FormGroup className="clear-group">
          <FormControlLabel
            control={
              <Checkbox color="default" className="win"
                        checked={win}
                        onChange={evt => setWin(evt.target.checked)} />
            }
            label="勝抜" />
        </FormGroup>
        <FormGroup className="clear-group">
          <FormControlLabel
            control={
              <Checkbox color="default" className="lose"
                        checked={lose}
                        onChange={evt => setLose(evt.target.checked)} />
            }
            label="失格" />
        </FormGroup>
        <FormGroup className="clear-group">
          <FormControlLabel
            disabled={!rule.other.showWinTimes}
            control={
              <Checkbox color="default" className="win-times"
                        checked={winTimes}
                        onChange={evt => setWinTimes(evt.target.checked)} />
            }
            label="勝抜回数" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button className="submit" color="primary" onClick={ok}>
          実行
        </Button>
        <Button className="close" color="secondary" onClick={cancel}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    open: state.open.clear
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenClear(open))
  })
)(Clear)

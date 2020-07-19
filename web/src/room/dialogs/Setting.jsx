import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormControlLabel, FormGroup, FormLabel, Slider
} from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_USER } from '../../communicate'
import './Setting.scss'

const Setting = ({ open, close, ws, user }) => {
  const [chatAnswer, setChatAnswer] = React.useState(false)
  const [volume, setVolume] = React.useState(0)

  const onEnter = () => {
    setChatAnswer(user.chatAnswer)
    setVolume(parseInt(localStorage.getItem('volume') || '100'))
  }

  const onSubmit = evt => {
    evt.preventDefault()
    sendWs(ws, SEND_USER, update(user, { chatAnswer: { $set: chatAnswer } }))
    localStorage.setItem('volume', volume)
    close()
  }

  return (
    <Dialog open={open} onEnter={onEnter}
            aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">設定</DialogTitle>
        <DialogContent className="setting">
          <FormGroup>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox color="default"
                            checked={chatAnswer}
                            onChange={evt => setChatAnswer(evt.target.checked)} />
                }
                label="チャット解答マーク" />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <FormLabel>
                音量
              </FormLabel>
              <Slider min={0} max={100}
                      valueLabelDisplay="auto"
                      marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
                      value={volume} onChange={(evt, newValue) => setVolume(newValue)} />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            設定
          </Button>
          <Button color="secondary" onClick={close}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    user: state.user
  })
)(Setting)

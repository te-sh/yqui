import React from 'react'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormControlLabel, FormGroup, FormLabel, Slider
} from '@material-ui/core'
import update from 'immutability-helper'
import './Setting.scss'

const Setting = ({ open, setting, ok, cancel }) => {
  const [chatAnswer, setChatAnswer] = React.useState(false)
  const [volume, setVolume] = React.useState(0)

  const onEnter = () => {
    setChatAnswer(setting.chatAnswer)
    setVolume(setting.volume)
  }

  const submit = evt => {
    evt.preventDefault()
    ok(update(setting, {
      chatAnswer: { $set: chatAnswer },
      volume: { $set: parseInt(volume) }
    }))
  }

  return (
    <Dialog open={open} onEnter={onEnter}
            aria-labelledby="form-dialog-title">
      <form onSubmit={submit}>
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
          <Button color="secondary" onClick={cancel}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Setting

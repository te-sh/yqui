import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
  FormControlLabel, FormGroup, FormLabel, Slider, Switch
} from '@material-ui/core'
import { GithubPicker } from 'react-color'
import update from 'immutability-helper'
import { storeChatSound, retrieveChatSound, storeVolume, retrieveVolume } from '../../lib/dexie'
import { COLORS, initUser } from '../../lib/user'
import { sendWs, USER } from '../../lib/send'
import { setOpenSetting } from '../../redux/open_actions'
import './Setting.scss'

const Setting = ({ user, open, setOpen }) => {
  const [chatAnswer, setChatAnswer] = React.useState(initUser.chatAnswer)
  const [borderColor, setBorderColor] = React.useState(initUser.borderColor)
  const [chatSound, setChatSound] = React.useState(true)
  const [volume, setVolume] = React.useState(0)

  const onEnter = async () => {
    setChatAnswer(user.chatAnswer)
    setBorderColor(user.borderColor === '#ff000000' ? '#ffffff' : user.borderColor)
    setChatSound(await retrieveChatSound())
    setVolume(await retrieveVolume())
  }

  const submit = evt => {
    sendWs(USER, update(user, {
      chatAnswer: { $set: chatAnswer },
      borderColor: { $set: borderColor === '#ffffff' ? '#ff000000' : borderColor }
    }))
    storeChatSound(chatSound)
    storeVolume(volume)
    setOpen(false)
    evt.preventDefault()
  }

  const cancel = () => {
    setOpen(false)
  }

  return (
    <Dialog className="setting-dialog" open={open}
            TransitionProps={{ onEnter }}
            aria-labelledby="form-dialog-title">
      <form onSubmit={submit}>
        <DialogTitle id="form-dialog-title">設定</DialogTitle>
        <DialogContent className="setting">
          <FormGroup className="form-group">
            <FormControl>
              <FormControlLabel
                control={
                  <Switch color="primary"
                          checked={chatAnswer}
                          onChange={evt => setChatAnswer(evt.target.checked)} />
                }
                label="チャット解答マーク" />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <FormLabel>枠の色</FormLabel>
              <GithubPicker width="175"
                            colors={COLORS}
                            triangle="hide"
                            color={borderColor}
                            onChange={color => setBorderColor(color.hex)} />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <FormControlLabel
                control={
                  <Switch color="primary"
                          checked={chatSound}
                          onChange={evt => setChatSound(evt.target.checked)} />
                }
                label="チャット音" />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <FormLabel>音量</FormLabel>
              <Slider min={0} max={100}
                      valueLabelDisplay="auto"
                      marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
                      value={volume} onChange={(evt, newValue) => setVolume(newValue)} />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button type="submit" className="submit" color="primary">
            設定
          </Button>
          <Button className="close" color="secondary" onClick={cancel}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    user: state.user,
    open: state.open.setting
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenSetting(open))
  })
)(Setting)

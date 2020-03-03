import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography
} from '@material-ui/core'
import { settingClose } from './redux/actions'

const Setting = ({ open, settingClose }) => {
  const [volume, setVolume] = React.useState(0)

  const onEnter = () => {
    setVolume(parseInt(localStorage.getItem('volume') || '100'))
  }

  const submit = evt => {
    evt.preventDefault()
    localStorage.setItem('volume', volume)
    settingClose()
  }

  const cancel = _evt => {
    settingClose()
  }

  return (
    <Dialog open={open} onEnter={() => onEnter()}
            aria-labelledby="form-dialog-title">
      <form onSubmit={evt => submit(evt)}>
        <DialogTitle id="form-dialog-title">設定</DialogTitle>
        <DialogContent>
          <Typography>
            音量
          </Typography>
          <Slider min={0} max={100}
                  valueLabelDisplay="auto"
                  marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
                  value={volume} onChange={(evt, newValue) => setVolume(newValue)} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            設定
          </Button>
          <Button color="secondary" onClick={() => cancel()}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    open: state.settingOpen
  }),
  dispatch => ({
    settingClose: () => dispatch(settingClose())
  })
)(Setting)

import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormGroup, Slider, Typography
} from '@material-ui/core'

const Setting = ({ open, close }) => {
  const [volume, setVolume] = React.useState(0)

  const onEnter = () => {
    setVolume(parseInt(localStorage.getItem('volume') || '100'))
  }

  const onSubmit = evt => {
    evt.preventDefault()
    localStorage.setItem('volume', volume)
    close()
  }

  return (
    <Dialog open={open} onEnter={onEnter}
            aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">設定</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControl>
              <Typography>
                音量
              </Typography>
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

export default Setting

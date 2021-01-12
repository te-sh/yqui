import React from 'react'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormControlLabel, FormGroup, FormLabel, TextField
} from '@material-ui/core'
import { GithubPicker } from 'react-color'
import { COLORS, initUser } from '../lib/user'
import './EnterRoom.scss'

const EnterRoom = ({ open, close, submit }) => {
  const [name, setName] = React.useState('')
  const [observer, setObserver] = React.useState(false)
  const [chatAnswer, setChatAnswer] = React.useState(initUser.chatAnswer)
  const [borderColor, setBorderColor] = React.useState(initUser.borderColor)

  const onSubmit = evt => {
    evt.preventDefault()
    submit({
      name, observer, chatAnswer,
      borderColor: borderColor === '#ffffff' ? '#ff000000' : borderColor
    })
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">入室</DialogTitle>
        <DialogContent className="enter-room">
          <FormGroup className="form-group">
            <FormControl>
              <TextField id="name" label="ハンドル"
                         inputProps={{maxLength: 9}}
                         value={name}
                         onChange={evt => setName(evt.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox color="default"
                            checked={observer}
                            onChange={evt => setObserver(evt.target.checked)} />
                }
                label="観戦" />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
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
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" disabled={name.length === 0}>
            入室
          </Button>
          <Button color="secondary" onClick={close}>
            キャンセル
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EnterRoom

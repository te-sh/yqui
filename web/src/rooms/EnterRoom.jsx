import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
  FormControlLabel, FormGroup, FormLabel, Switch, TextField
} from '@material-ui/core'
import { GithubPicker } from 'react-color'
import {
  storeName, retrieveName, storeChatAnswer, retrieveChatAnswer
} from '../lib/dexie'
import { COLORS, initUser } from '../lib/user'
import './EnterRoom.scss'

const EnterRoom = ({ room, open, submit, close }) => {
  const [name, setName] = React.useState(initUser.name)
  const [title, setTitle] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [observer, setObserver] = React.useState(false)
  const [chatAnswer, setChatAnswer] = React.useState(initUser.chatAnswer)
  const [borderColor, setBorderColor] = React.useState(initUser.borderColor)

  const first = room && room.numUsers === 0

  const onEnter = async () => {
    setName(await retrieveName())
    setTitle(!first && room.title === '' ? `(Room${room.no})` : room.title)
    setPassword(!first && !room.hasPassword ? '(不要)' : '')
    setObserver(false)
    setChatAnswer(await retrieveChatAnswer())
  }

  const onSubmit = evt => {
    evt.preventDefault()
    storeName(name)
    storeChatAnswer(chatAnswer)
    submit({
      roomNo: room.no,
      first,
      name,
      tag: { title, password },
      observer,
      chatAnswer,
      borderColor: borderColor === '#ffffff' ? '#ff000000' : borderColor
    })
  }

  return (
    <Dialog className="enter-room-dialog" open={open}
            TransitionProps={{ onEnter }}
            aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">入室</DialogTitle>
        <DialogContent className="enter-room">
          <FormGroup className="form-group">
            <FormControl>
              <TextField id="name" label="ハンドル"
                         className="name"
                         inputProps={{ maxLength: 9 }}
                         value={name}
                         onChange={evt => setName(evt.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <TextField id="title" label="部屋名"
                         className="title"
                         inputProps={{ readOnly: !first, maxLength: 20 }}
                         value={title}
                         onChange={evt => setTitle(evt.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <TextField id="password" label="合言葉"
                         className="password"
                         disabled={!first && room && !room.hasPassword}
                         inputProps={{ maxLength: 20 }}
                         value={password}
                         onChange={evt => setPassword(evt.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <FormControlLabel
                control={
                  <Switch color="primary" className="observer"
                          checked={observer}
                          onChange={evt => setObserver(evt.target.checked)} />
                }
                label="観戦" disabled={first} />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl>
              <FormControlLabel
                control={
                  <Switch color="primary" className="chat-answer"
                          checked={chatAnswer}
                          onChange={evt => setChatAnswer(evt.target.checked)} />
                }
                label="チャット解答マーク" />
            </FormControl>
          </FormGroup>
          <FormGroup className="form-group">
            <FormControl className="border-color">
              <FormLabel>枠の色</FormLabel>
              <GithubPicker width="175" colors={COLORS} triangle="hide"
                            color={borderColor}
                            onChange={color => setBorderColor(color.hex)} />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button type="submit" className="submit" color="primary"
                  disabled={name.length === 0}>
            入室
          </Button>
          <Button className="close" color="secondary" onClick={close}>
            キャンセル
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EnterRoom

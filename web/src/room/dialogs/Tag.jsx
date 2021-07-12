import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormGroup, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, TAG } from '../../lib/send'
import { setOpenTag } from '../../redux/open_actions'
import './Tag.scss'

const Tag = ({ tag, user, open, setOpen }) => {
  const [title, setTitle] = React.useState(tag.title)
  const [password, setPassword] = React.useState(tag.password)

  const onEnter = async () => {
    setTitle(tag.title)
    setPassword(tag.password)
  }

  const ok = () => {
    setOpen(false)
    sendWs(TAG, update(tag, {
      title: { $set: title },
      password: { $set: password }
    }))
  }

  const cancel = () => {
    setOpen(false)
  }

  return (
    <Dialog className="tag-dialog" open={open}
            TransisionProps={{ onEnter }}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">部屋情報</DialogTitle>
      <DialogContent>
        <FormGroup className="info-group">
          <TextField label="部屋名" className="title"
                     InputProps={{ inputProps: { readOnly: !user.isMaster, maxLength: 20 } }}
                     value={title}
                     onChange={evt => setTitle(evt.target.value)} />
        </FormGroup>
        <FormGroup className="info-group">
          <TextField label="合言葉" className="password"
                     InputProps={{ inputProps: { readOnly: !user.isMaster, maxLength: 20 } }}
                     value={password}
                     onChange={evt => setPassword(evt.target.value)} />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button className="submit" color="primary" disabled={!user.isMaster} onClick={ok}>
          設定
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
    tag: state.tag,
    user: state.user,
    open: state.open.tag
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenTag(open))
  })
)(Tag)

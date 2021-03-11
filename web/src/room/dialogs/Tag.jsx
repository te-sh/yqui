import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_TAG } from '../../lib/send'
import { setOpenTag } from '../../redux/actions'
import './Tag.scss'

const Tag = ({ tag, user, open, setOpen }) => {
  const [title, setTitle] = React.useState(tag.title)

  const onEnter = async () => {
    setTitle(tag.title)
  }

  const ok = () => {
    setOpen(false)
    sendWs(SEND_TAG, update(tag, {
      title: { $set: title }
    }))
  }

  const cancel = () => {
    setOpen(false)
  }

  return (
    <Dialog className="tag-dialog" open={open} onEnter={onEnter}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">情報</DialogTitle>
      <DialogContent>
        <TextField label="部屋名" className="title"
                   InputProps={{ inputProps: { readOnly: !user.isMaster, maxLength: 20 } }}
                   fullWidth
                   value={title}
                   onChange={evt => setTitle(evt.target.value)} />
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

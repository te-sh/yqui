import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { setPrompt } from '../redux/actions'

const Prompt = ({ prompt, setPrompt }) => {
  const info = prompt || {}

  const ok = () => {
    setPrompt(null)
    if (prompt.close) {
      prompt.close(true)
    }
  }

  const cancel = () => {
    setPrompt(null)
    if (prompt.close) {
      prompt.close(false)
    }
  }

  return (
    <Dialog className="prompt-dialog" open={!!prompt}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{info.title}</DialogTitle>
      <DialogContent>
        <Typography className="message">
          {info.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button className="ok" color="primary" onClick={ok}>
          OK
        </Button>
        <Button className="cancel" color="secondary" onClick={cancel}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    prompt: state.dialog.prompt
  }),
  dispatch => ({
    setPrompt: prompt => dispatch(setPrompt(prompt))
  })
)(Prompt)

import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography
} from '@material-ui/core'
import { setPrompt } from '../redux/actions'

const Prompt = ({ prompt, setPrompt }) => {
  const [text, setText] = React.useState('')

  React.useEffect(
    () => {
      if (prompt) {
        setText(prompt.text || '')
      }
    },
    [prompt]
  )

  const info = prompt || {}

  const ok = evt => {
    evt.preventDefault()
    setPrompt(null)
    if (prompt.close) {
      prompt.close(text)
    }
  }

  const cancel = evt => {
    evt.preventDefault()
    setPrompt(null)
    if (prompt.close) {
      prompt.close(null)
    }
  }

  return (
    <Dialog className="prompt-dialog" open={!!prompt}
            aria-labelledby="form-dialog-title">
      <form onSubmit={ok}>
        <DialogTitle id="form-dialog-title">{info.title}</DialogTitle>
        <DialogContent>
          <Typography className="message">
            {info.message}
          </Typography>
          <TextField className="text" autoFocus
                     value={text}
                     onChange={evt => setText(evt.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" className="ok" color="primary" onClick={ok}>
            OK
          </Button>
          <Button className="cancel" color="secondary" onClick={cancel}>
            キャンセル
          </Button>
        </DialogActions>
      </form>
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

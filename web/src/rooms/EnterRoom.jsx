import React from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'

const EnterRoom = ({ open, close, submit }) => {
  const [name, setName] = React.useState('')

  const onSubmit = evt => {
    evt.preventDefault()
    submit(name)
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">入室</DialogTitle>
        <DialogContent>
          <TextField id="name" label="ハンドル"
                     inputProps={{maxLength: 9}}
                     value={name}
                     onChange={evt => setName(evt.target.value)} />
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
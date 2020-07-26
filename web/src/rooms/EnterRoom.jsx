import React from 'react'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormControlLabel, FormGroup, TextField
} from '@material-ui/core'

const EnterRoom = ({ open, close, submit }) => {
  const [name, setName] = React.useState('')
  const [observer, setObserver] = React.useState(false)

  const onSubmit = evt => {
    evt.preventDefault()
    submit({ name, observer })
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">入室</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControl>
              <TextField id="name" label="ハンドル"
                         inputProps={{maxLength: 9}}
                         value={name}
                         onChange={evt => setName(evt.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup>
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

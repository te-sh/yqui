import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'
import { enterRoom } from './redux/actions'

const EnterRoom = ({ open, enterRoom }) => {
  const [name, setName] = React.useState('')

  const submit = evt => {
    evt.preventDefault();
    enterRoom(name)
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={evt => submit(evt)}>
        <DialogTitle id="form-dialog-title">入室</DialogTitle>
        <DialogContent>
          <TextField id="name" label="ハンドル"
                     inputProps={{maxLength: 10}}
                     value={name}
                     onChange={evt => setName(evt.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" disabled={name.length === 0}>
            入室
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    open: state.enterRoom
  }),
  dispatch => ({
    enterRoom: data => dispatch(enterRoom(data))
  })
)(EnterRoom)

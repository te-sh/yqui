import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'
import { enterRoom } from './actions'

const EnterRoom = ({ props, state, action }) => {
  const [name, setName] = React.useState('')

  const enterRoom = evt => {
    evt.preventDefault();
    action.enterRoom(name)
  }

  return (
    <Dialog open={state.open} aria-labelledby="form-dialog-title">
      <form onSubmit={evt => enterRoom(evt)}>
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
  state => ({ state: {
    open: state.enterRoom
  }}),
  dispatch => ({ action: {
    enterRoom: data => dispatch(enterRoom(data))
  }})
)(EnterRoom)

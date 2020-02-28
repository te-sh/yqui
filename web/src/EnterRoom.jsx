import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'
import { enterRoom } from './actions'

const EnterRoom = ({ props, state, action }) => {
  const [name, setName] = React.useState('')

  return (
    <Dialog open={state.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">入室</DialogTitle>
      <DialogContent>
        <TextField id="name" label="ハンドル"
                   onChange={evt => setName(evt.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => action.enterRoom(name)} color="primary">入室</Button>
      </DialogActions>
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

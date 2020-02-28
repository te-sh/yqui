import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'

const EnterRoom = props => {
  const [name, setName] = React.useState('')

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">入室</DialogTitle>
      <DialogContent>
        <TextField id="name" label="ハンドル"
                   onChange={evt => setName(evt.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onEnter(name)} color="primary">入室</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EnterRoom;

import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'

const Actions = ({ ws, selfID, room }) => {
  const answer = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'a' }))
    }
  }

  const reset = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'r' }))
    }
  }

  const forPlayer = (
    <Button variant="outlined" color="primary" size="large"
            onClick={() => answer()}>
      早押し
    </Button>
  )

  const forMaster = (
    <Button variant="outlined" color="primary" size="large"
            onClick={() => reset()}>
      リセット
    </Button>
  )

  return (
    <Paper className="actions">
      {selfID === room.master ? forMaster : forPlayer}
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    selfID: state.selfID,
    room: state.room
  })
)(Actions)

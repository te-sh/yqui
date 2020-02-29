import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'

const Actions = ({ ws, selfID, room }) => {
  const answer = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'a' }))
    }
  }

  const correct = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 's' }))
    }
  }

  const wrong = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'f' }))
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

  const forMaster = [
    <Button variant="outlined" color="primary" size="large" key="correct"
            onClick={() => correct()}
            startIcon={<RadioButtonUnchecked />}>
      正解
    </Button>,
    <Button variant="outlined" color="secondary" size="large" key="wrong"
            onClick={() => wrong()}
            startIcon={<Close />}>
      不正解
    </Button>,
    <Button variant="outlined" color="default" size="large" key="reset"
            onClick={() => reset()}>
      リセット
    </Button>
  ]

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

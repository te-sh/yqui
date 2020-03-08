import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'
import { send } from './communicate'
import './Actions.scss'

const Actions = ({ ws }) => {
  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 13:
        send.pushButton(ws)
        break
      default:
        break
    }
  }

  return (
    <Paper className="actions" tabIndex="0" onKeyDown={onKeyDown}>
      <Button variant="outlined" color="primary" size="large"
              onClick={() => send.pushButton(ws)}>
        早押し
      </Button>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws
  })
)(Actions)

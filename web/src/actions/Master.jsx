import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import { send } from '../communicate'
import './Actions.scss'

const Master = ({ className, ws }) => {
  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 81:
        send.correct(ws)
        break
      case 87:
        send.wrong(ws)
        break
      case 69:
        send.through(ws)
        break
      case 82:
        send.reset(ws)
        break
      case 84:
        send.allClear(ws)
        break
      case 37:
        send.undo(ws)
        break
      case 39:
        send.redo(ws)
        break
      default:
        break
    }
  }

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content">
        <Button variant="outlined" color="primary" size="large"
                onClick={() => send.correct(ws)}
                startIcon={<RadioButtonUnchecked />}>
          正解
        </Button>
        <Button variant="outlined" color="secondary" size="large"
                onClick={() => send.wrong(ws)}
                startIcon={<Close />}>
          不正解
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.through(ws)}>
          スルー
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.reset(ws)}>
          リセット
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.allClear(ws)}>
          オールクリア
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.undo(ws)}>
          Undo
        </Button>
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.redo(ws)}>
          Redo
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws
  })
)(Master)

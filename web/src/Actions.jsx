import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import { send } from './communicate'

const Actions = ({ ws, isMaster }) => {
  const onKeyDown = (evt) => {
    const keyCode = evt.keyCode
    if (isMaster) {
      switch (keyCode) {
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
    } else {
      switch (keyCode) {
        case 13:
          send.pushButton(ws)
          break
        default:
          break
      }
    }
  }

  const forMaster = [
    <Button variant="outlined" color="primary" size="large" key="correct"
            onClick={() => send.correct(ws)}
            startIcon={<RadioButtonUnchecked />}>
      正解
    </Button>,
    <Button variant="outlined" color="secondary" size="large" key="wrong"
            onClick={() => send.wrong(ws)}
            startIcon={<Close />}>
      不正解
    </Button>,
    <Button variant="outlined" color="default" size="large" key="through"
            onClick={() => send.through(ws)}>
      スルー
    </Button>,
    <Button variant="outlined" color="default" size="large" key="reset"
            onClick={() => send.reset(ws)}>
      リセット
    </Button>,
    <Button variant="outlined" color="default" size="large" key="all-clear"
            onClick={() => send.allClear(ws)}>
      オールクリア
    </Button>,
    <Button variant="outlined" color="default" size="large" key="undo"
            onClick={() => send.undo(ws)}>
      Undo
    </Button>,
    <Button variant="outlined" color="default" size="large" key="redo"
            onClick={() => send.redo(ws)}>
      Redo
    </Button>
  ]

  const forPlayer = (
    <Button variant="outlined" color="primary" size="large"
            onClick={() => send.pushButton(ws)}>
      早押し
    </Button>
  )

  return (
    <Paper>
      <div className="actions" tabIndex="0"
           onKeyDown={evt => onKeyDown(evt)}>
        {isMaster ? forMaster : forPlayer }
      </div>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    isMaster: state.isMaster
  })
)(Actions)

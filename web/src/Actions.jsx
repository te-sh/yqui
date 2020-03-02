import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'

const Actions = ({ ws, selfID, room }) => {
  const isPlayer = () => selfID !== room.master

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

  const next = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'n' }))
    }
  }

  const reset = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'r' }))
    }
  }

  const allClear = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'e' }))
    }
  }

  const undo = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'u' }))
    }
  }

  const redo = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'o' }))
    }
  }

  const onKeyDown = (evt) => {
    const keyCode = evt.keyCode
    if (isPlayer()) {
      switch (keyCode) {
        case 13:
          answer()
          break
        default:
          ;
      }
    } else {
      switch (keyCode) {
        case 67:
          correct()
          break
        case 87:
          wrong()
          break
        case 78:
          next()
          break
        case 82:
          reset()
          break
        case 65:
          allClear()
          break
        case 37:
          undo()
          break
        case 39:
          redo()
          break
        default:
          ;
      }
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
    <Button variant="outlined" color="default" size="large" key="next"
            onClick={() => next()}>
      次の問題
    </Button>,
    <Button variant="outlined" color="default" size="large" key="reset"
            onClick={() => reset()}>
      リセット
    </Button>,
    <Button variant="outlined" color="default" size="large" key="all-clear"
            onClick={() => allClear()}>
      オールクリア
    </Button>,
    <Button variant="outlined" color="default" size="large" key="undo"
            onClick={() => undo()}>
      Undo
    </Button>,
    <Button variant="outlined" color="default" size="large" key="redo"
            onClick={() => redo()}>
      Redo
    </Button>
  ]

  return (
    <Paper>
      <div className="actions" tabIndex="0"
           onKeyDown={evt => onKeyDown(evt)}>
        {isPlayer() ? forPlayer : forMaster }
      </div>
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

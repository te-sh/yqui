import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import { intKeys } from '../../util'
import { send, sendWs, SEND_CORRECT, SEND_WRONG } from '../../communicate'
import './Actions.scss'

const Master = ({ className, ws, rule, boards, boardLock }) => {
  const openAll = () => {
    for (let player of intKeys(boards)) {
      boards[player].open = true
    }
    send.boards(ws, boards)
  }

  const onKeyDown = evt => {
    switch (evt.keyCode) {
      case 81:
        if (rule.board.active) {
          send.boardLock(ws)
        } else {
          sendWs(ws, SEND_CORRECT)
        }
        break
      case 87:
        if (rule.board.active) {
          openAll()
        } else {
          sendWs(ws, SEND_WRONG)
        }
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

  const normalButtons = (
    <Box>
      <Button variant="outlined" color="primary" size="large"
              onClick={() => sendWs(ws, SEND_CORRECT)}
              startIcon={<RadioButtonUnchecked />}>
        正解
      </Button>
      <Button variant="outlined" color="secondary" size="large"
              onClick={() => sendWs(ws, SEND_WRONG)}
              startIcon={<Close />}>
        不正解
      </Button>
    </Box>
  )

  const boardButtons = (
    <Box>
      <Button variant="outlined" color="default" size="large"
              onClick={() => send.boardLock(ws)}>
        { boardLock ? '回答ロック解除' : '回答ロック' }
      </Button>
      <Button variant="outlined" color="default" size="large"
              onClick={openAll}>
        すべてオープン
      </Button>
    </Box>
  )

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content">
        { rule.board.active ? boardButtons : normalButtons }
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.through(ws)}>
          次の問題
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
    ws: state.ws,
    rule: state.rule,
    boards: state.boards,
    boardLock: state.boardLock
  })
)(Master)

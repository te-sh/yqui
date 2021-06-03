import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import URI from 'urijs'
import { openAlert } from './lib/dialog'
import { saveScoreBackup } from './lib/score'
import playSound from './lib/sound'
import { setMobile, setWebSocket } from './redux/browser_actions'
import {
  reset, recvSelfID, recvRooms, recvRoom, recvRule, recvSg, recvButtons, recvTimer, recvChat
} from './redux/actions'
import { recvBg, recvBoard } from './redux/board_actions'
import Rooms from './rooms/Rooms'
import Room from './room/Room'

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const Root = ({ setMobile, reset, setWebSocket, recv }) => {
  setMobile(useMediaQuery('(max-width:667px)'))

  const createWebSocket = () => {
    const ws = new WebSocket(uri.toString())
    setWebSocket(ws)

    ws.onopen = evt => {
      console.log('ws open', evt)
    }

    ws.onclose = evt => {
      console.log('ws close', evt)
      setWebSocket(null)
      reset()
      createWebSocket()
    }

    ws.onmessage = evt => {
      const data = JSON.parse(evt.data)
      switch (data.type) {
        case 'failedJoin':
          openAlert({
            title: '入室エラー',
            message: '入室できませんでした'
          })
          break
        case 'scoreBackup':
          saveScoreBackup(data.content)
          break
        case 'sound':
          playSound(data.content)
          break
        default:
          recv[data.type](data.content)
      }
    }

    ws.onerror = evt => {
      console.log('ws error: ' + evt.data)
    }
  }

  createWebSocket()

  return (
    <Router>
      <Route exact path="/" component={Rooms}></Route>
      <Route path="/room/:roomNo" component={Room}></Route>
    </Router>
  )
}

export default connect(
  null,
  dispatch => ({
    setMobile: mobile => dispatch(setMobile(mobile)),
    reset: () => dispatch(reset()),
    setWebSocket: ws => dispatch(setWebSocket(ws)),
    recv: {
      selfID: selfID => dispatch(recvSelfID(selfID)),
      rooms: rooms => dispatch(recvRooms(rooms)),
      room: room => dispatch(recvRoom(room)),
      rule: rule => dispatch(recvRule(rule)),
      bg: bg => dispatch(recvBg(bg)),
      board: board => dispatch(recvBoard(board)),
      sg: sg => dispatch(recvSg(sg)),
      buttons: buttons => dispatch(recvButtons(buttons)),
      timer: timer => dispatch(recvTimer(timer)),
      chat: chat => dispatch(recvChat(chat))
    }
  })
)(Root)

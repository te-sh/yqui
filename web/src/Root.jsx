import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import URI from 'urijs'
import { openAlert } from './lib/dialog'
import { storeScoreBackup } from './lib/dexie'
import playSound from './lib/sound'
import { setMobile, setWebSocket } from './redux/browser_actions'
import store from './redux/store'
import { reset, recvSelfID, recvRoom } from './redux/actions'
import { recvRooms } from './redux/rooms_actions'
import { recvChat } from './redux/chat_actions'
import { recvRule } from './redux/rule_actions'
import { recvButton } from './redux/button_actions'
import { recvSg } from './redux/score_actions'
import { recvBg, recvBoard } from './redux/board_actions'
import { recvTimer } from './redux/timer_actions'
import Rooms from './rooms/Rooms'
import Room from './room/Room'

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const getUserName = () => {
  const { user } = store.getState()
  return user.name
}

const Root = ({ setMobile, setWebSocket, reset, recv }) => {
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
          // 'user' must not connect to this component to avoid reload it
          storeScoreBackup(getUserName(), data.content)
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
    setWebSocket: ws => dispatch(setWebSocket(ws)),
    reset: () => dispatch(reset()),
    recv: {
      rooms: rooms => dispatch(recvRooms(rooms)),
      chat: chat => dispatch(recvChat(chat)),
      rule: rule => dispatch(recvRule(rule)),
      button: button => dispatch(recvButton(button)),
      sg: sg => dispatch(recvSg(sg)),
      bg: bg => dispatch(recvBg(bg)),
      board: board => dispatch(recvBoard(board)),
      timer: timer => dispatch(recvTimer(timer)),
      selfID: selfID => dispatch(recvSelfID(selfID)),
      room: room => dispatch(recvRoom(room))
    }
  })
)(Root)

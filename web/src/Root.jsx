import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import URI from 'urijs'
import {
  reset, setWebSocket, recvRooms, recvJoined,
  recvSelfID, recvRoom, recvBoards, recvBoardLock,
  recvBoard, recvSg, recvButtons, recvChat
} from './redux/actions'
import playSound from './sound'
import Rooms from './rooms/Rooms'
import Room from './room/Room'

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const Root = ({ reset, setWebSocket, recv }) => {
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
      console.log('ws received: ' + evt.data)
      const data = JSON.parse(evt.data)
      if (data.type === 'sound') {
        playSound(data.content)
      } else if (recv[data.type]) {
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
    reset: () => dispatch(reset()),
    setWebSocket: ws => dispatch(setWebSocket(ws)),
    recv: {
      selfID: selfID => dispatch(recvSelfID(selfID)),
      rooms: rooms => dispatch(recvRooms(rooms)),
      joined: roomNo => dispatch(recvJoined(roomNo)),
      room: room => dispatch(recvRoom(room)),
      boards: boards => dispatch(recvBoards(boards)),
      board: board => dispatch(recvBoard(board)),
      boardLock: boardLock => dispatch(recvBoardLock(boardLock)),
      sg: sg => dispatch(recvSg(sg)),
      buttons: buttons => dispatch(recvButtons(buttons)),
      chat: chat => dispatch(recvChat(chat))
    }
  })
)(Root)

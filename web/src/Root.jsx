import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import URI from 'urijs'
import {
  reset, setWebSocket, recvJoined,
  recvSelfID, recvRoom, recvUsers, recvTeams,
  recvScores, recvButtons, recvRule, recvChat
} from './redux/actions'
import playSound from './sound'
import Rooms from './Rooms'
import Room from './Room'

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
      joined: roomNo => dispatch(recvJoined(roomNo)),
      selfID: selfID => dispatch(recvSelfID(selfID)),
      room: room => dispatch(recvRoom(room)),
      users: users => dispatch(recvUsers(users)),
      teams: teams => dispatch(recvTeams(teams)),
      scores: scores => dispatch(recvScores(scores)),
      buttons: buttons => dispatch(recvButtons(buttons)),
      rule: rule => dispatch(recvRule(rule)),
      chat: chat => dispatch(recvChat(chat))
    }
  })
)(Root)

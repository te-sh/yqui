import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import URI from 'urijs'
import {
  reset, setWebSocket,
  recvSelfID, recvRoom, recvUsers, recvTeams,
  recvScores, recvButtons, recvRule, recvChat
} from './redux/actions'
import { send } from './communicate'
import playSound from './sound'
import Room from './Room'
import EnterRoom from './dialogs/EnterRoom'

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const Root = ({ reset, setWebSocket, recv }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(true)

  const enterRoom = name => {
    setEnterRoomOpen(false)

    const ws = new WebSocket(uri.toString())
    setWebSocket(ws)

    ws.onopen = evt => {
      console.log('ws open', evt)
      send.join(ws, { roomNo: 0, name })
    }

    ws.onclose = evt => {
      console.log('ws close', evt)
      setEnterRoomOpen(true)
      reset()
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

  return (
    <Router>
      <Route exact path="/" component={Room}></Route>
      <EnterRoom open={enterRoomOpen} submit={enterRoom} />
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

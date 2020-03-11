import React from 'react'
import { connect } from 'react-redux'
import URI from 'urijs'
import playSound from './sound'
import {
  reset, setWebSocket, recvSelfID, recvRoom, recvAttendees,
  recvScores, recvButtons, recvRule, recvChat
} from './redux/actions'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Mainarea from './Mainarea'
import Subactions from './subactions/Subactions'
import Actions from './actions/Actions'
import EnterRoom from './dialogs/EnterRoom'
import './Page.scss'

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const Page = ({ reset, setWebSocket, recv }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(true)

  const enterRoom = name => {
    setEnterRoomOpen(false)

    const ws = new WebSocket(uri.query({ name }).toString())
    setWebSocket(ws)

    ws.onopen = evt => {
      console.log('ws open', evt)
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
    <div className="page">
      <TopBar className="top-bar" />
      <Messages className="messages" />
      <Chat className="chat" />
      <Mainarea className="mainarea" />
      <Subactions className="subactions" />
      <Actions className="actions" />
      <EnterRoom open={enterRoomOpen} submit={enterRoom} />
    </div>
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
      attendees: attendees => dispatch(recvAttendees(attendees)),
      scores: scores => dispatch(recvScores(scores)),
      buttons: buttons => dispatch(recvButtons(buttons)),
      rule: rule => dispatch(recvRule(rule)),
      chat: chat => dispatch(recvChat(chat))
    }
  })
)(Page)

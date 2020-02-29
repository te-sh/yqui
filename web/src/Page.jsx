import React from 'react'
import { connect } from 'react-redux'
import {
  leaveRoom, playSound, recvAnswers, recvSelfID, recvRoom, recvMessage
} from './redux/actions'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Players from './Players'
import Actions from './Actions'
import EnterRoom from './EnterRoom'
import SoundEffect from './SoundEffect'

const Page = ({ ws, action }) => {
  if (ws) {
    if (!ws.onopen) {
      ws.onopen = evt => {
        console.log('ws open')
      }
    }

    if (!ws.onclose) {
      ws.onclose = evt => {
        console.log('ws close')
        action.leaveRoom()
      }
    }

    if (!ws.onmessage) {
      ws.onmessage = evt => {
        console.log('ws received: ' + evt.data)
        let data = JSON.parse(evt.data)
        switch (data.type) {
          case 'answers':
            action.recvAnswers(data.content)
            break
          case 'sound':
            action.playSound(data.content)
            break
          case 'selfID':
            action.recvSelfID(data.content)
            break
          case 'room':
            action.recvRoom(data.content)
            break
          case 'chat':
            action.recvMessage(data.content)
            break
          default:
            ;
        }
      }
    }

    if (!ws.onerror) {
      ws.onerror = evt => {
        console.log('ws error: ' + evt.data)
      }
    }
  }

  return (
    <div className="page">
      <TopBar />
      <Chat />
      <Messages />
      <Players />
      <Actions />
      <EnterRoom />
      <SoundEffect />
    </div>
  )
}

export default connect(
  state => ({
    ws: state.ws
  }),
  dispatch => ({ action: {
    leaveRoom: () => dispatch(leaveRoom()),
    playSound: name => dispatch(playSound(name)),
    recvAnswers: answers => dispatch(recvAnswers(answers)),
    recvSelfID: selfID => dispatch(recvSelfID(selfID)),
    recvRoom: room => dispatch(recvRoom(room)),
    recvMessage: message => dispatch(recvMessage(message))
  }})
)(Page)

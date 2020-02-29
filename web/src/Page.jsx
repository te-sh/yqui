import React from 'react'
import { connect } from 'react-redux'
import { leaveRoom, recvRoom, recvMessage } from './actions'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Players from './Players'
import Actions from './Actions'
import EnterRoom from './EnterRoom'

const Page = ({ props, state, action }) => {
  if (state.ws) {
    if (!state.ws.onopen) {
      state.ws.onopen = evt => {
        console.log('ws open')
      }
    }

    if (!state.ws.onclose) {
      state.ws.onclose = evt => {
        console.log('ws close')
        action.leaveRoom()
      }
    }

    if (!state.ws.onmessage) {
      state.ws.onmessage = evt => {
        console.log('ws received: ' + evt.data)
        let data = JSON.parse(evt.data)
        switch (data.type) {
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

    if (!state.ws.onerror) {
      state.ws.onerror = evt => {
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
    </div>
  )
}

export default connect(
  state => ({ state: {
    ws: state.ws
  }}),
  dispatch => ({ action: {
    leaveRoom: () => dispatch(leaveRoom()),
    recvRoom: (room) => dispatch(recvRoom(room)),
    recvMessage: (message) => dispatch(recvMessage(message))
  }})
)(Page)

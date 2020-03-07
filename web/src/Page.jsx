import React from 'react'
import { connect } from 'react-redux'
import playSound from './sound'
import {
  leaveRoom, recvSelfID, recvUsers, recvAttendees,
  recvScores, recvButtons, recvRule, recvMessage
} from './redux/actions'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Players from './Players'
import MixDisplay from './MixDisplay'
import Actions from './Actions'
import EnterRoom from './EnterRoom'
import Rule from './Rule'
import Setting from './Setting'
import './Page.scss'

const Page = ({ ws, action }) => {
  if (ws) {
    if (!ws.onopen) {
      ws.onopen = evt => {
        console.log('ws open', evt)
      }
    }

    if (!ws.onclose) {
      ws.onclose = evt => {
        console.log('ws close', evt)
        action.leaveRoom()
      }
    }

    if (!ws.onmessage) {
      ws.onmessage = evt => {
        console.log('ws received: ' + evt.data)
        let data = JSON.parse(evt.data)
        switch (data.type) {
          case 'sound':
            playSound(data.content)
            break
          case 'selfID':
            action.recvSelfID(data.content)
            break
          case 'users':
            action.recvUsers(data.content)
            break
          case 'attendees':
            action.recvAttendees(data.content)
            break
          case 'scores':
            action.recvScores(data.content)
            break
          case 'buttons':
            action.recvButtons(data.content)
            break
          case 'rule':
            action.recvRule(data.content)
            break
          case 'chat':
            action.recvMessage(data.content)
            break
          default:
            break
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
      <Messages />
      <Chat />
      <Players />
      <MixDisplay />
      <Actions />
      <EnterRoom />
      <Rule />
      <Setting />
    </div>
  )
}

export default connect(
  state => ({
    ws: state.ws
  }),
  dispatch => ({ action: {
    leaveRoom: () => dispatch(leaveRoom()),
    recvSelfID: selfID => dispatch(recvSelfID(selfID)),
    recvUsers: users => dispatch(recvUsers(users)),
    recvAttendees: attendees => dispatch(recvAttendees(attendees)),
    recvScores: scores => dispatch(recvScores(scores)),
    recvButtons: buttons => dispatch(recvButtons(buttons)),
    recvRule: rule => dispatch(recvRule(rule)),
    recvMessage: message => dispatch(recvMessage(message))
  }})
)(Page)

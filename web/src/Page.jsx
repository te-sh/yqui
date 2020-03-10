import React from 'react'
import { connect } from 'react-redux'
import URI from 'urijs'
import playSound from './sound'
import {
  reset, setWebSocket, recvSelfID, recvUsers, recvAttendees,
  recvScores, recvButtons, recvRule, recvMessage
} from './redux/actions'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Players from './Players'
import TeamEdit from './TeamEdit'
import MixDisplay from './MixDisplay'
import Actions from './actions/Actions'
import EnterRoom from './EnterRoom'
import './Page.scss'

const uri = URI(window.location.href).protocol('ws').pathname('/ws')

const Page = ({ ws, editTeam, action }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(true)

  const enterRoom = name => {
    setEnterRoomOpen(false)

    ws = new WebSocket(uri.query({ name }).toString())
    action.setWebSocket(ws)

    ws.onopen = evt => {
      console.log('ws open', evt)
    }

    ws.onclose = evt => {
      console.log('ws close', evt)
      setEnterRoomOpen(true)
      action.reset()
    }

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

    ws.onerror = evt => {
      console.log('ws error: ' + evt.data)
    }
  }

  const main = (() => {
    if (editTeam) {
      return <TeamEdit />
    } else {
      return <Players />
    }
  })()

  return (
    <div className="page">
      <TopBar />
      <Messages />
      <Chat />
      {main}
      <MixDisplay />
      <Actions />
      <EnterRoom open={enterRoomOpen} submit={enterRoom} />
    </div>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    editTeam: state.editTeam
  }),
  dispatch => ({ action: {
    reset: () => dispatch(reset()),
    setWebSocket: ws => dispatch(setWebSocket(ws)),
    recvSelfID: selfID => dispatch(recvSelfID(selfID)),
    recvUsers: users => dispatch(recvUsers(users)),
    recvAttendees: attendees => dispatch(recvAttendees(attendees)),
    recvScores: scores => dispatch(recvScores(scores)),
    recvButtons: buttons => dispatch(recvButtons(buttons)),
    recvRule: rule => dispatch(recvRule(rule)),
    recvMessage: message => dispatch(recvMessage(message))
  }})
)(Page)

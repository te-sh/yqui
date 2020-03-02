import React from 'react'
import { connect } from 'react-redux'
import playSound from './sound'
import {
  leaveRoom, recvRule, recvAnswers, recvAnswerTimes,
  recvRight, recvSelfID, recvRoom, recvMessage
} from './redux/actions'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Players from './Players'
import Actions from './Actions'
import EnterRoom from './EnterRoom'
import Rule from './Rule'

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
          case 'sound':
            playSound(data.content)
            break
          case 'rule':
            action.recvRule(data.content)
            break
          case 'answers':
            action.recvAnswers(data.content)
            break
          case 'answerTimes':
            action.recvAnswerTimes(data.content)
            break
          case 'right':
            action.recvRight(data.content)
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
      <Rule />
    </div>
  )
}

export default connect(
  state => ({
    ws: state.ws
  }),
  dispatch => ({ action: {
    leaveRoom: () => dispatch(leaveRoom()),
    recvRule: rule => dispatch(recvRule(rule)),
    recvAnswers: answers => dispatch(recvAnswers(answers)),
    recvAnswerTimes: answerTimes => dispatch(recvAnswerTimes(answerTimes)),
    recvRight: right => dispatch(recvRight(right)),
    recvSelfID: selfID => dispatch(recvSelfID(selfID)),
    recvRoom: room => dispatch(recvRoom(room)),
    recvMessage: message => dispatch(recvMessage(message))
  }})
)(Page)

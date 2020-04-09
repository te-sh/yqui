import React from 'react'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Mainarea from './Mainarea'
import Subactions from './subactions/Subactions'
import Actions from './actions/Actions'
import './Room.scss'

const Room = () => {
  return (
    <div className="room">
      <TopBar className="top-bar" />
      <Messages className="messages" />
      <Chat className="chat" />
      <Mainarea className="mainarea" />
      <Subactions className="subactions" />
      <Actions className="actions" />
    </div>
  )
}

export default Room

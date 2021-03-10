import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import Topbar from './topbar/TopBar'
import RoomInfo from './RoomInfo'
import RuleDisplay from './rule-display/RuleDisplay'
import Messages from './chat/Messages'
import Chat from './chat/Chat'
import ToggleLeft from './ToggleLeft'
import Teams from './players/Teams'
import Subactions from './subactions/Subactions'
import Actions from './actions/Actions'
import Dialogs from './dialogs/Dialogs'
import './Room.scss'

const Room = ({ history, showLeft, roomNo }) => {
  React.useEffect(
    () => {
      if (roomNo === null) {
        history.push('/')
      }
    },
    [history, roomNo]
  )

  const roomClass = classNames('room', {
    'hide-left': !showLeft
  })

  return (
    <Box className={roomClass}>
      <Topbar className="top-bar" />
      <RoomInfo className="room-info" />
      <RuleDisplay className="rule-display" />
      <Messages className="messages" />
      <Chat className="chat" />
      <ToggleLeft className="toggle-left" />
      <Teams className="teams" />
      <Subactions className="subactions" />
      <Actions className="actions" />
      <Dialogs />
    </Box>
  )
}

export default connect(
  state => ({
    showLeft: state.showLeft,
    roomNo: state.roomNo
  })
)(Room)

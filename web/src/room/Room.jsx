import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import Topbar from './topbar/TopBar'
import MasterDisplay from './MasterDisplay'
import RuleDisplay from './rule-display/RuleDisplay'
import Chat from './chat/Chat'
import Messages from './chat/Messages'
import Teams from './players/Teams'
import Subactions from './subactions/Subactions'
import Actions from './actions/Actions'
import './Room.scss'

const Room = ({ history, roomNo }) => {
  React.useEffect(
    () => {
      if (roomNo === null) {
        history.push('/')
      }
    },
    [history, roomNo]
  )

  return (
    <Box className="room">
      <Topbar className="top-bar" />
      <MasterDisplay className="master-display" />
      <RuleDisplay className="rule-display" />
      <Messages className="messages" />
      <Chat className="chat" />
      <Teams className="teams" />
      <Subactions className="subactions" />
      <Actions className="actions" />
    </Box>
  )
}

export default connect(
  state => ({
    roomNo: state.roomNo
  })
)(Room)

import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import TopBar from './TopBar'
import RuleDisplay from './rule-display/RuleDisplay'
import Chat from './Chat'
import Messages from './Messages'
import Mainarea from './Mainarea'
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
      <TopBar className="top-bar" />
      <RuleDisplay className="rule-display" />
      <Messages className="messages" />
      <Chat className="chat" />
      <Mainarea className="mainarea" />
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


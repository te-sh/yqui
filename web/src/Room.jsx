import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import TopBar from './TopBar'
import Chat from './Chat'
import Messages from './Messages'
import Mainarea from './Mainarea'
import Subactions from './subactions/Subactions'
import Boardactions from './boardactions/Boardactions'
import Actions from './actions/Actions'
import './Room.scss'

const Room = ({ history, roomNo, rule }) => {
  React.useEffect(
    () => {
      if (roomNo === null) {
        history.push('/')
      }
    },
    [history, roomNo]
  )

  const boardAvailable = { 'board-available': rule.board }

  return (
    <Box className="room">
      <TopBar className="top-bar" />
      <Messages className="messages" />
      <Chat className="chat" />
      <Mainarea className={classNames('mainarea', boardAvailable)} />
      <Subactions className={classNames('subactions', boardAvailable)} />
      { rule.board ? <Boardactions className="boardactions" /> : null }
      <Actions className="actions" />
    </Box>
  )
}

export default connect(
  state => ({
    roomNo: state.roomNo,
    rule: state.rule
  })
)(Room)

